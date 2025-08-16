import type { APIContext, MiddlewareNext } from 'astro'
import { getIp } from './utils/common'
export async function onRequest(ctx: APIContext, next: MiddlewareNext) {
    console.log(process.env.BOSS, '222')
    getIp(ctx)

    const referer =
        ctx.request.headers.get('Referer') || // 正确拼写
        ctx.request.headers.get('Referrer') || // 少数代理会用这个
        '';

    const ref = ctx.request.headers.get('referer') || '';
    const u = new URL(ref);
    const origin = u.origin;   // https://example.com
    const path = u.pathname; // 跨域通常是 '/'

    const ref1 = ctx.request.headers.get('Referer')

    console.log(ctx.request.headers, 'ctx.request')

    console.log(ref1, 'ref1')

    console.log(origin, 'origin')

    console.log(path, 'path')

    console.log(referer, 'referer')

    return next()
}