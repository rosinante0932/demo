// 用法：vercel.json 里把 buildCommand 指向：node scripts/select-build.js
const { execSync } = require('node:child_process');

const vercelEnv = process.env.VERCEL_ENV || 'production';   // development | preview | production
const branch = (process.env.VERCEL_GIT_BRANCH || '').toLowerCase();

// 只输出 dev / test / rc / prod
let mode;
if (vercelEnv === 'development') {
  mode = 'dev';
} else if (vercelEnv === 'preview') {
  // 预览环境：按分支名细分
  if (/^(test|tests)\b|\/test\//.test(branch)) mode = 'test';
  else if (/^(rc|release)\b|\/rc\//.test(branch)) mode = 'rc';
  else mode = 'rc'; // 预览缺省走 rc
} else {
  mode = 'prod';
}

// 运行时也带上 APP_ENV，代码里可用 astro:env/server 读取
process.env.APP_ENV = process.env.APP_ENV || mode;

console.log(`[build] VERCEL_ENV=${vercelEnv} branch=${branch} -> astro --mode ${mode} (APP_ENV=${process.env.APP_ENV})`);
execSync(`astro build --mode ${mode}`, { stdio: 'inherit' });
