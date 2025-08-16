import type { APIContext, MiddlewareNext } from 'astro'
import { getIp } from './utils/common'
export async function onRequest(ctx: APIContext, next: MiddlewareNext) {
    console.log(process.env.BOSS, '222')
    getIp(ctx)

    const referer =
        ctx.request.headers.get('referer') || // 正确拼写
        ctx.request.headers.get('referrer') || // 少数代理会用这个
        '';

    console.log(referer, 'referer')

    return next()
}