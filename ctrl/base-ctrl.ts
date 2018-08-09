import { Request, Response } from 'express'
import config from '../config'
import { toolset } from '../util'
import { User } from '../model'
import { jwtSvc } from '../service'

export default {

    /**
     * user login
     */
    async login(req: Request, res: Response) {
        let { username, password, redirectUrl } = req.body

        // user exists and username & password match
        const getRes = await User.findOne({ where: { username } })
        if (
            !getRes ||
            getRes.username !== username ||
            getRes.password !== toolset.hash(password + config.HASH_SECRET)
        ) {
            throw toolset.messageErr('LoginFail')
        }

        // create jwt token
        const jwt = await jwtSvc.sign({ username })

        if (redirectUrl) {
            redirectUrl = `${redirectUrl}?jwt=${jwt}`
        }

        res.success({
            jwt,
            sysType: getRes.sysType,
            username: getRes.username,
            avatar: getRes.avatar,
            redirectUrl,
        })
    },

    /**
     * verify jwt token
     */
    async verify(req: Request, res: Response) {
        const { authorization } = req.headers
        if (!authorization) {
            throw toolset.messageErr('VerifyFail')
        }
        const jwt = authorization.substr(7)

        // verify jwt token
        let payload
        try {
            payload = await jwtSvc.verify(jwt)
        } catch (e) {
            throw toolset.messageErr('VerifyFail')
        }
        if (!payload) {
            throw toolset.messageErr('VerifyFail')
        }

        res.success(payload)
    },

    /**
     * user register
     */
    async register(req: Request, res: Response) {
        let { sysType, username, password, avatar } = req.body

        // user exists
        if (await User.findOne({ where: { username } })) {
            throw toolset.messageErr('UserExist')
        }

        password = toolset.hash(password + config.HASH_SECRET)
        await User.create({
            sysType,
            username,
            password,
            avatar,
        })

        res.success()
    },
}
