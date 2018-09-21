import { Context } from 'koa'

export default async (ctx: Context, next: Function) => {
    ctx.body = ctx.request.body
    return next()
}
