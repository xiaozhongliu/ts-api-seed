import express from 'express'

declare module 'express' {

    interface Request {
        auth?: object
    }

    interface Response {
        reqId?: string
        start?: number
        success(data?: object, msg?: string): void
        fail(code?: string | number, msg?: string): void
    }
}
