import 'koa'

declare module 'koa' {

    interface BaseContext {
        success(data?: object | string, msg?: string): void
        fail(code?: string | number, msg?: string): void
    }

    interface Context {
        auth?: object
        errors?: object[]

        checkHeaders: Function
        checkParams: Function
        checkQuery: Function
        checkBody: Function
    }
}
