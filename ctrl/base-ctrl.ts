import { toolset } from '../util'
import config from '../config'
import { User } from '../model'
import { jwtSvc } from '../service'

export default {

    /**
     * login
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
            throw global.MessageErr('LoginFail')
        }

        // create jwt token
        const accessToken = await jwtSvc.sign({ username })

        if (redirectUrl) {
            redirectUrl = `${redirectUrl}?accessToken=${accessToken}`
        }

        res.success({
            accessToken,
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
            throw global.MessageErr('VerifyFail')
        }
        const accessToken = authorization.substr(7)

        // verify jwt token
        let payload
        try {
            payload = await jwtSvc.verify(accessToken)
        } catch (e) {
            throw global.MessageErr('VerifyFail')
        }
        if (!payload) {
            throw global.MessageErr('VerifyFail')
        }

        res.success(payload)
    },

    /**
     * register
     */
    async register(req: Request, res: Response) {
        let { sysType, username, password, avatar } = req.body

        // user exists
        if (await User.findOne({ where: { username } })) {
            throw global.MessageErr('UserExist')
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
