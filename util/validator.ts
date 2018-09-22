/* ******************************************************************
 * custom validators for koa-validate.
 * https://github.com/RocksonZeta/koa-validate/blob/master/validate.js
 ****************************************************************** */
import { Validator } from 'koa-validate'

Object.assign(Validator.prototype, {

    isString(tip: string) {
        if (this.goOn && typeof this.value !== 'string') {
            this.addError(tip)
        }
        return this
    },

    isBoolean(tip: string) {
        if (this.goOn && typeof this.value !== 'boolean') {
            this.addError(tip)
        }
        return this
    },

    isHash(tip: string) {
        if (this.goOn && !/^[a-f0-9]{32}$/i.test(this.value)) {
            this.addError(tip)
        }
        return this
    },

    isIdCardNO(tip: string) {
        if (this.goOn && !/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.value)) {
            this.addError(tip)
        }
        return this
    },

    isMongoId(tip: string) {
        if (this.goOn && !/^[a-f0-9]{24}$/i.test(this.value)) {
            this.addError(tip)
        }
        return this
    },

    isStamp(tip: string) {
        if (this.goOn && !/^[0-9]{13}$/.test(this.value.toString())) {
            this.addError(tip)
        }
        return this
    },

    isUnixStamp(tip: string) {
        if (this.goOn && !/^[0-9]{10}$/.test(this.value.toString())) {
            this.addError(tip)
        }
        return this
    },
})
