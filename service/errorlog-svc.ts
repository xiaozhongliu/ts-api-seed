import { Context } from 'koa'
import { mailer } from '../util'
import config from '../config'

export default {

    /**
     * alarm system level errors
     */
    createErrorLog(ctx: Context, code: number | string, message: string, stack: string) {
        const errorLog = {
            endType: 'backend',
            appName: config.API_NAME,
            errTitle: message,
            errCode: code,
            errStack: stack,
            data: {
                url: ctx.url,
                method: ctx.method,
                header: {
                    clientip: ctx.get('http_x_forwarded_for'),
                },
            },
            username: ctx.body.username,
        }
        if (ctx.method !== 'GET') {
            // @ts-ignore
            errorLog.data.body = ctx.body
        }

        mailer.alarm(config.API_NAME, JSON.stringify(errorLog))

        // logic to save errors into db
    },
}
