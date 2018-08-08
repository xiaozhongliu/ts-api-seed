import { Router, Request, Response } from 'express'
import { validate } from './midware'
import { baseCtrl, errorLogCtrl } from './ctrl'
const router = Router()

// base
register('post', '/login', baseCtrl.login)
register('get', '/verify', baseCtrl.verify)
register('post', '/register', baseCtrl.register)


// check health
const monitor = (req: Request, res: Response) => res.success(undefined, 'sevice works well')
router.get('/', monitor)
router.get('/monitor', monitor)


/**
 * register ctrl and validate(if any) midware funcs to routes
 * @param method   http method
 * @param path     route path
 * @param func     ctrl func
 * @param midwares route level midware functions
 */
function register(method: string, path: string, func: Function, ...midwares: Function[]) {
    const funcName = func.name
    // @ts-ignore
    const fields = validate[funcName]
    if (fields) {
        const validFunc = (req: Request, res: Response, next: Function) => {
            validate.validateParams(req, next, fields)
        }
        return router[method](path, validFunc, ...midwares, co(func))
    }
    return router[method](path, ...midwares, co(func))
}

/**
 * wrap all ctrl funcs to handle errors
 * @param ctrl ctrl function
 */
function co(ctrl: Function) {
    return async (req: Request, res: Response, next: Function) => {
        try {
            await ctrl(req, res, next)
        } catch (e) {
            next(e)
        }
    }
}

export default router
