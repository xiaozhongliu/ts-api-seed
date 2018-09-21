import 'koa-router'
import { Moment } from 'moment'

declare module 'koa-router' {

    interface Router extends Indexed { }
}
