import { Request, Response } from 'express'
import config from '../config'
import { toolset } from '../util'
import { jwtSvc } from '../service'

export default async (req: Request, res: Response, next: Function) => {
    if (isNoAuthPath(req.path) || req.method === 'OPTIONS') {
        return next()
    }

    const { authorization } = req.headers
    if (!authorization) {
        return next(toolset.messageErr('AuthFail'))
    }
    const jwt = authorization.substr(7)

    let payload
    try {
        payload = await jwtSvc.verify(jwt)
    } catch (e) {
        return next(toolset.messageErr('AuthFail'))
    }
    if (!payload) {
        return next(toolset.messageErr('AuthFail'))
    }

    req.auth = payload
    next()
}

/**
 * no auth files or paths
 * @param path req url
 */
function isNoAuthPath(path: string): Boolean {
    return config.NO_AUTH_PATHS.includes(path) || config.NO_AUTH_REG.test(path)
}
