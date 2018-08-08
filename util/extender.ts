/* ******************************************************************
 * extends targets here
 ****************************************************************** */
import express from 'express'

// @ts-ignore
Object.assign(express.response, {

    success(data?: object, msg: string = 'success') {
        this.json({ code: 1, msg, data })
    },

    fail(code: number | string = -1, msg: string = 'fail') {
        this.json({ code, msg })
    },
})
