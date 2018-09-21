import { promisify } from 'util'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../config'

const sign = promisify(jwt.sign).bind(jwt)
const verify = promisify(jwt.verify).bind(jwt)
const JWT_SECRET = Buffer.from(config.JWT_SECRET, 'base64')

export default {

    /**
     * jwt sign
     * @param payload data to be signed
     */
    async sign(payload: object) {
        return sign(
            payload,
            JWT_SECRET,
            {
                issuer: config.JWT_ISSUER,
                expiresIn: config.JWT_TOKEN_TIMEOUT,
            },
        )
    },

    /**
     * jwt verify
     * @param token token to be verified
     */
    async verify(token: string) {
        const payload = await verify(
            token,
            JWT_SECRET,
            { issuer: config.JWT_ISSUER },
        )
        delete payload.iss
        delete payload.iat
        delete payload.exp
        return payload
    },
}
