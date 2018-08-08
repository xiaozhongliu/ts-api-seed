import { promisify } from 'util'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../config'

const sign = promisify(jwt.sign).bind(jwt)
const verify = promisify(jwt.verify).bind(jwt)

export default {

    /**
     * jwt sign
     * @param payload data to be signed
     */
    async sign(payload: object) {
        return sign(
            payload,
            config.JWT_SECRET,
            { expiresIn: config.JWT_TOKEN_TIMEOUT },
        )
    },

    /**
     * jwt verify
     * @param token token to be verified
     */
    async verify(token: string) {
        const payload = await verify(
            token,
            config.JWT_SECRET,
        )
        delete payload.iat
        delete payload.exp
        return payload
    },
}
