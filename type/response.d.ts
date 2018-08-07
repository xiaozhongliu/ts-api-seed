import express from 'express'

declare module 'express' {

    interface Request {
        auth?: Object
    }

    interface Response {
        reqId?: string
        start?: number
        success(data?: Object, msg?: string): void
        fail(code?: string | number, msg?: string): void
    }
}
