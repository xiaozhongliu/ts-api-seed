import { Context } from 'koa'
import { errorlogSvc } from '../service'

export default {

    async bodyMounter(ctx: Context, next: Function) {
        ctx.body = ctx.request.body
        return next()
    },

    async errorHandler(ctx: Context, next: Function) {
        try {
            await next()
        } catch ({ code = -1, message, stack }) {
            ctx.fail(code, message)
            if (code === -1) console.log(stack)
            if (code > 100001) return
            errorlogSvc.createErrorLog(ctx, code, message, stack)
        }
    },
}
