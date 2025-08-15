import type { APIContext, MiddlewareNext } from 'astro'
export async function onRequest(ctx: APIContext, next: MiddlewareNext) {
    console.log(process.env.BOSS, '222')
    return next()
}