import core from 'express-serve-static-core'

declare module 'express-serve-static-core' {

    export interface Router extends IRouter, Indexed { }
}
