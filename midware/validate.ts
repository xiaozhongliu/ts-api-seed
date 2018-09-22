import { Context } from 'koa'
import messages from '../message'
import { toolset, validhelper } from '../util'

const Types = {
    String: { name: 'String', func: 'isString', base: 'String' },
    Number: { name: 'Number', func: 'isFloat' },
    Boolean: { name: 'Boolean', func: 'isBoolean' },
    Url: { name: 'Url', func: 'isUrl', base: 'String' },
    Hash: { name: 'Hash', func: 'isHash', base: 'String' },
    Phone: { name: 'Phone', func: 'isMobilePhone', base: 'String' },
    IdCardNO: { name: 'IdCardNO', func: 'isIdCardNO', base: 'String' },
    ObjectId: { name: 'ObjectId', func: 'isMongoId', base: 'String' },
    Stamp: { name: 'Stamp', func: 'isStamp' },
    UnixStamp: { name: 'UnixStamp', func: 'isUnixStamp' },
}

export default {

    login: [
        ['sysType', Types.Number, true],
        ['username', Types.String, true],
        ['password', Types.String, true],
    ],

    register: [
        ['sysType', Types.Number, true],
        ['username', Types.String, true],
        ['password', Types.String, true],
        ['avatar', Types.String, false],
    ],

    getDynamicConfig: [
        ['key', Types.String, true],
    ],

    /**
     * validation helper
     */
    validateParams(ctx: Context, next: Function, fields: [string, Type, boolean][]) {
        fields.forEach(([field, type, required]) => {
            if (required) {
                const key = getEmptyErrorKey(field)
                validhelper.assertEmptyOne(ctx, field, messages.get(key).code)
            }

            if (field in ctx.query) {
                queryParser(ctx.query, field, type)
            } else if (field in ctx.body) {
                bodyChecker(ctx.body, field, type)
            }

            if (field in ctx.query || field in ctx.body) {
                validhelper.assertType(ctx, field, messages.CommonErr.code, type)
            }
        })

        if (ctx.errors) {
            const error: Indexed = ctx.errors[0]
            const errorMsg = error[Object.keys(error)[0]]
            const arr = errorMsg.split('@@')
            const err = new Error(arr[1])
            err.code = Number.parseInt(arr[0])
            throw err
        }
        return next()
    },
}

function getEmptyErrorKey(field: string) {
    const firstLetterToUpper = field.slice(0, 1).toUpperCase()
    const otherLetters = field.slice(1)
    return `${firstLetterToUpper}${otherLetters}Empty`
}

function queryParser(query: any, field: string, type: Type) {
    const value = query[field]
    try {
        if (type === Types.Number) {
            const parsed = parseFloat(value)
            if (global.isNaN(parsed)) throw new Error()
            query[field] = parsed
        } else if (type === Types.Boolean) {
            if (!['true', 'false'].includes(value)) throw new Error()
            query[field] = value === 'true'
        }
    } catch (error) {
        error.code = messages.CommonErr.code
        error.message = `请求参数${field}的值${value}不是${type.name}类型`
        throw error
    }
}

function bodyChecker(body: any, field: string, type: Type) {
    const value = body[field]
    if (type.base === 'String' && typeof value !== 'string') {
        throw toolset.extractErr({
            code: messages.CommonErr.code,
            msg: `请求参数${field}的值${value}不是String类型`,
        })
    }
    if (type.base !== 'String' && typeof value === 'string') {
        throw toolset.extractErr({
            code: messages.CommonErr.code,
            msg: `请求参数${field}的值${value}不可以是String类型`,
        })
    }
}
