import express from 'express'
import { Moment } from 'moment'

declare module 'express' {

    interface Request {
        auth?: object
    }

    interface Response {
        start?: Moment
        log?: {
            url: string,
            method: string,
            headers: string,
            action?: string,
            data?: string,
            resp?: string,
            status?: number,
            '@clientip'?: string,
            '@reqstart'?: string,
            '@clientgeo'?: object,
            '@reqend'?: string,
            '@duration'?: number,
        }

        success(data?: object | string, msg?: string): void
        fail(code?: string | number, msg?: string): void
    }
}
