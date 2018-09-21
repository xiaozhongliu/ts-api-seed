import { Context } from 'koa'
import Router from 'koa-router'
import config from './config'
import { validate } from './midware'
import { baseCtrl, testCtrl } from './ctrl'

const router = new Router({ prefix: `/${config.API_NAME}` })


// base
register('post', '/login', baseCtrl.login)
register('get', '/verify', baseCtrl.verify)
register('post', '/register', baseCtrl.register)

// test
register('get', '/dynconfig', testCtrl.getDynamicConfig)

// check health
const monitor = (ctx: Context, next: Function) => {
    ctx.success(undefined, 'sevice works well')
}
router.get('/', monitor)
router.get('/monitor', monitor)


/**
 * register ctrl and validate(if any) midware funcs to routes
 * @param method   http method
 * @param path     route path
 * @param func     ctrl function
 * @param midwares route level midware functions
 */
function register(method: string, path: string, func: Function, ...midwares: Function[]) {
    const funcName = func.name
    // @ts-ignore
    const fields = validate[funcName]
    if (fields) {
        const validFunc = (ctx: Context, next: Function) => {
            return validate.validateParams(ctx, next, fields)
        }
        return router[method](path, validFunc, ...midwares, func)
    }
    router[method](path, ...midwares, func)
}

export default router
