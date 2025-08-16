import { execSync } from 'node:child_process';

const vercelEnv = process.env.VERCEL_ENV ?? 'production';     // development | preview | production
const branch = (process.env.VERCEL_GIT_BRANCH ?? '').toLowerCase();

// 只用 dev / test / rc / prod
let mode;
if (vercelEnv === 'development') {
  mode = 'dev';
} else if (vercelEnv === 'preview') {
  if (/^(test|tests)\b|\/test\//.test(branch)) mode = 'test';
  else if (/^(rc|release)\b|\/rc\//.test(branch)) mode = 'rc';
  else mode = 'rc';
} else {
  mode = 'prod';
}

process.env.APP_ENV = process.env.APP_ENV || mode;

console.log(
  `[build] VERCEL_ENV=${vercelEnv} branch=${branch} -> astro --mode ${mode} (APP_ENV=${process.env.APP_ENV})`
);
execSync(`astro build --mode ${mode}`, { stdio: 'inherit' });
