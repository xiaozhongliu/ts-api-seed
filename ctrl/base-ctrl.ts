import { Context } from 'koa'
import config from '../config'
import { toolset } from '../util'
import { User } from '../model'
import { jwtSvc } from '../service'

export default {

    /**
     * user login
     */
    async login(ctx: Context) {
        let { username, password, redirectUrl } = ctx.body

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

        ctx.success({
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
    async verify(ctx: Context) {
        const { authorization } = ctx.headers
        if (!authorization) {
            throw toolset.messageErr('VerifyFail')
        }
        const jwt = authorization.substr(7)

        // verify jwt token
        let payload
        try {
            payload = await jwtSvc.verify(jwt)
        } catch (error) {
            throw toolset.messageErr('VerifyFail')
        }
        if (!payload) {
            throw toolset.messageErr('VerifyFail')
        }

        ctx.success(payload)
    },

    /**
     * user register
     */
    async register(ctx: Context) {
        let { sysType, username, password, avatar } = ctx.body

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

        ctx.success()
    },
}
