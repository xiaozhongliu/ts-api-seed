/* ******************************************************************
 * helper functions for express-validator
 ****************************************************************** */
import { Context } from 'koa'
import messages from '../message'

export default {

    /**
     * check if a field is empty
     * @param ctx   context obj
     * @param field target field
     * @param code  error code
     */
    assertEmptyOne(ctx: Context, field: string, code: number) {
        const assertMethod = getMethod(ctx, field).bind(ctx)
        assertMethod(field).notEmpty(`${code}@@请求参数${field}不能为空`)
    },

    /**
     * check if some header fields are empty
     * @param ctx    context obj
     * @param fields target fields list
     */
    assertEmptyFromHeader(ctx: Context, fields: string[]) {
        fields.forEach(field => {
            const { code, msg } = messages.AuthFail
            ctx.checkHeaders(field).notEmpty(`${code}@@${msg}`)
        })
    },

    /**
     * check field type
     * @param ctx   context obj
     * @param field target field
     * @param code  error code
     * @param type  field type
     */
    assertType(ctx: Context, field: string, code: number, type: Type) {
        const assertMethod = getMethod(ctx, field).bind(ctx)
        const midRes: any = assertMethod(field)
        midRes[type.func](`${code}@@请求参数${field}的值${getFieldValue(ctx, field)}不是${type.name}类型`)
    },
}

function getMethod(ctx: Context, field: string) {
    if (ctx.method === 'GET' && ctx.query[field]) return ctx.checkQuery
    else if (ctx.method !== 'GET' && ctx.body[field]) return ctx.checkBody
    return ctx.checkParams
}

function getFieldValue(ctx: Context, field: string) {
    let value
    if (ctx.method === 'GET' && ctx.query[field]) value = ctx.query[field]
    else if (ctx.method !== 'GET' && ctx.body[field]) value = ctx.body[field]
    else value = ctx.params[field]

    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    return value
}
