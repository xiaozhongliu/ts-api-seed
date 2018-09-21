/* ******************************************************************
 * extends targets here
 ****************************************************************** */
import Koa from 'koa'
import messages from '../message'
const { Success, Fail } = messages

export default async (app: Koa) => {

    app.context.success = function (
        data?: object | string,
        msg: string = Success.msg,
    ) {
        this.body = { code: Success.code, msg, data }
    }

    app.context.fail = function (
        code: number | string = Fail.code,
        msg: string = Fail.msg,
    ) {
        this.body = { code, msg }
    }
}
