/* ******************************************************************
 * extends targets here
 ****************************************************************** */
import express from 'express'
import messages from '../message'
const { Success, Fail } = messages

// @ts-ignore
Object.assign(express.response, {

    success(
        data?: object | string,
        msg: string = Success.msg,
    ) {
        this.json({ code: Success.code, msg, data })
    },

    fail(
        code: number | string = Fail.code,
        msg: string = Fail.msg,
    ) {
        this.json({ code, msg })
    },
})
