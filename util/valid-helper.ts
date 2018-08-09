/* ******************************************************************
 * helper functions for express-validator
 ****************************************************************** */
import { Request, Response } from 'express'
import messages from '../message'

export default {

    /**
     * check if a field is empty
     * @param req   request obj
     * @param field target field
     * @param code  error code
     */
    assertEmptyOne(req: Request, field: string, code: number) {
        const assertMethod = getMethod(req, field)
        assertMethod(field, `${code}@@请求参数${field}不能为空`).notEmpty()
    },

    /**
     * check if some header fields are empty
     * @param req    request obj
     * @param fields target fields list
     */
    assertEmptyFromHeader(req: Request, fields: string[]) {
        fields.forEach(field => {
            const { code, msg } = messages.AuthFail
            req.checkHeaders(field, `${code}@@${msg}`).notEmpty()
        })
    },

    /**
     * check field type
     * @param req   request obj
     * @param field target field
     * @param code  error code
     * @param type  field type
     */
    assertType(req: Request, field: string, code: number, type: Type) {
        const assertMethod = getMethod(req, field)
        const midRes: any = assertMethod(
            field,
            `${code}@@请求参数${field}的值${getFieldValue(req, field)}不是${type.name}类型`,
        )
        midRes[type.func]()
    },
}

function getMethod(req: Request, field: string) {
    if (req.method === 'GET' && req.query[field]) return req.checkQuery
    else if (req.method !== 'GET' && req.body[field]) return req.checkBody
    return req.checkParams
}

function getFieldValue(req: Request, field: string) {
    let value
    if (req.method === 'GET' && req.query[field]) value = req.query[field]
    else if (req.method !== 'GET' && req.body[field]) value = req.body[field]
    else value = req.params[field]

    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    return value
}
