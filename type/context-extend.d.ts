import 'koa'
import { Moment } from 'moment'

declare module 'koa' {

    interface BaseContext {
        success(data?: object | string, msg?: string): void
        fail(code?: string | number, msg?: string): void
    }

    interface Context {
        auth: object
        errors: object[]

        checkHeaders: Function
        checkParams: Function
        checkQuery: Function
        checkBody: Function

        start: Moment
        log: {
            url: string
            method: string
            headers: string
            action?: string
            body?: string
            resp?: string
            status?: number
            '@clientip'?: string
            '@reqstart'?: string
            '@clientgeo'?: object
            '@reqend'?: string
            '@duration'?: number
        }
    }
}
