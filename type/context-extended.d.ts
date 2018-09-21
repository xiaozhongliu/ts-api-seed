import 'koa'
import { Moment } from 'moment'

declare module 'koa' {

    interface Context {
        auth?: object

        success(data?: object | string, msg?: string): void
        fail(code?: string | number, msg?: string): void
    }
}
