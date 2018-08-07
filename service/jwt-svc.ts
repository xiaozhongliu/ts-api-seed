import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import config from '../config'

export default {

    /**
     * jwt sign
     * @param {object} payload  data to be signed
     */
    async sign(payload) {
        return promisify(jwt.sign)(
            payload,
            config.JWT_SECRET,
            { expiresIn: config.JWT_TOKEN_TIMEOUT },
        )
    },

    /**
     * jwt verify
     * @param {string} token    token to be verified
     */
    async verify(token) {
        const payload = await promisify(jwt.verify)(
            token,
            config.JWT_SECRET,
        )
        return payload
    },
}
