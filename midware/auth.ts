import { Context } from 'koa'
import config from '../config'
import { toolset } from '../util'
import { jwtSvc } from '../service'

export default async (ctx: Context, next: Function) => {
    if (isNoAuthPath(ctx.path)) {
        return next()
    }

    const { authorization } = ctx.headers
    if (!authorization) {
        throw toolset.messageErr('AuthFail')
    }
    const jwt = authorization.substr(7)

    let payload
    try {
        payload = await jwtSvc.verify(jwt)
    } catch (error) {
        throw toolset.messageErr('AuthFail')
    }
    if (!payload) {
        throw toolset.messageErr('AuthFail')
    }

    ctx.auth = payload
    return next()
}

/**
 * no auth files or paths
 * @param path req url
 */
function isNoAuthPath(path: string) {
    return config.NO_AUTH_PATHS.includes(path) || config.NO_AUTH_REG.test(path)
}
