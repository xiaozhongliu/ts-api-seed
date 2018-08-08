/* ******************************************************************
 * fragmentary util functions are put here
 ****************************************************************** */
import crypto from 'crypto'
import moment from 'moment'
import xml2js from 'xml2js'
import { promisify } from 'util'
import messages from '../message'

moment.locale('zh-cn')
const builder = new xml2js.Builder()
const parser = new xml2js.Parser({ explicitArray: false, explicitRoot: false, trim: true })
const parseString = promisify(parser.parseString).bind(parser)

export default {

    /**
     * md5 hash
     * @param target original string
     */
    hash(target: string) {
        const md5 = crypto.createHash('md5')
        md5.update(target)
        return md5.digest('hex')
    },

    /**
     * hmac sign
     * @param target original string
     * @param key    encryption secret
     */
    sign(target: string, key: string) {
        const hmac = crypto.createHmac('sha1', key)
        return hmac.update(target).digest().toString('base64')
    },

    /**
     * format a data object to string
     * @param date     a Date object
     * @param friendly return in friendly format
     */
    formatDate(date: Date, friendly: Boolean) {
        const momentDate = moment(date)
        if (friendly) {
            return momentDate.fromNow()
        }
        return momentDate.format('YYYY-MM-DD HH:mm')
    },

    /**
     * amend a caculated amount of money. e.g.:
     * 0.1 + 0.2 => 0.30000000000000004
     * toolset.amend(0.1 + 0.2) => 0.3
     * @param amount
     * @param precision
     */
    amend(amount: number, precision: number = 2) {
        const factor = Math.pow(10, precision)
        return Math.round(amount * factor) / factor
    },

    /**
     * parse object to xml string
     * @param obj original object
     */
    buildXml(obj: object) {
        return builder.buildObject(obj)
    },

    /**
     * parse xml string to object
     * @param xml original xml string
     */
    async parseXml(xml: string) {
        return parseString(xml)
    },

    /**
     * validate a fuzzy search keyword
     * @param {string} keyword
     */
    checkKeyword(keyword) {
        try {
            return new RegExp(keyword || '.*')
        } catch (e) {
            throw new Error('请不要输入特殊字符')
        }
    },

    getMessage(key: string) {
        return messages[key]
    },

    messageErr(key: string, param?: string) {
        let { code, msg } = messages[key]
        if (param) {
            msg = msg.replace('@param', param)
        }
        const err = new Error(msg)
        err.code = code
        return err
    },

    extractErr(body: { code: number, msg: string }) {
        const err = new Error(body.msg)
        err.code = body.code
        return err
    },
}
