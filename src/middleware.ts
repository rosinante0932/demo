import type { APIContext, MiddlewareNext } from 'astro'
export async function onRequest(ctx: APIContext, next: MiddlewareNext) {
    console.log(process.env.BOSS, '222')
    const ip =
        ctx.clientAddress ??
        ctx.request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        ctx.request.headers.get('x-real-ip') ??
        ctx.request.headers.get('cf-connecting-ip') ??
        'unknown';

    console.log(ip)

    ctx.locals.ip = ip;

    return next()
}