import type { APIContext } from "astro"

export const isClient = typeof window !== 'undefined'

/**
 * @func getIpFn
 * @desc 获取ip
 */
export const getIp = (ctx: APIContext) => {
  const ip =
        ctx.clientAddress ??
        ctx.request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        ctx.request.headers.get('x-real-ip') ??
        ctx.request.headers.get('cf-connecting-ip') ??
        'unknown';

    console.log(ip)

    ctx.locals.ip = ip;
}