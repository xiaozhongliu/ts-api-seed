/* ******************************************************************
 * custom validators for koa-validate.
 * https://github.com/RocksonZeta/koa-validate/blob/master/validate.js
 ****************************************************************** */
import { Validator } from 'koa-validate'

Validator.prototype.isString = function (tip: string) {
    if (this.goOn && typeof this.value !== 'string') {
        this.addError(tip)
    }
    return this
}

Validator.prototype.isBoolean = function (tip: string) {
    if (this.goOn && typeof this.value !== 'boolean') {
        this.addError(tip)
    }
    return this
}

Validator.prototype.isHash = function (tip: string) {
    if (this.goOn && !/^[a-f0-9]{32}$/i.test(this.value)) {
        this.addError(tip)
    }
    return this
}

Validator.prototype.isIdCardNO = function (tip: string) {
    if (this.goOn && !/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.value)) {
        this.addError(tip)
    }
    return this
}

Validator.prototype.isMongoId = function (tip: string) {
    if (this.goOn && !/^[a-f0-9]{24}$/i.test(this.value)) {
        this.addError(tip)
    }
    return this
}

Validator.prototype.isStamp = function (tip: string) {
    if (this.goOn && !/^[0-9]{13}$/.test(this.value.toString())) {
        this.addError(tip)
    }
    return this
}

Validator.prototype.isUnixStamp = function (tip: string) {
    if (this.goOn && !/^[0-9]{10}$/.test(this.value.toString())) {
        this.addError(tip)
    }
    return this
}
