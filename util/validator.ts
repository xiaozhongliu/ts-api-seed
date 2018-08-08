/* ******************************************************************
 * custom validators for express-validator. read more here:
 * https://github.com/ctavan/express-validator#middleware-options
 ****************************************************************** */
export default {

    isString(value: string) {
        return typeof value === 'string'
    },

    isHash(value: string) {
        return /^[a-f0-9]{32}$/i.test(value)
    },

    isPhone(value: string) {
        return /^1[3|4|5|8|7][0-9]\d{8}$/.test(value)
    },

    isStamp(value: number) {
        return /^[0-9]{13}$/.test(value.toString())
    },

    isUnixStamp(value: number) {
        return /^[0-9]{10}$/.test(value.toString())
    },

    isStringArray(value: string[]) {
        if (!Array.isArray(value)) return false
        for (const item of value) {
            if (!this.isString(item)) return false
        }
        return true
    },

    isIdCardNO(value: string) {
        return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value)
    },
}