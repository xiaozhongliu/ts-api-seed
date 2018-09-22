import Koa, { Context } from 'koa'
import moment from 'moment'
import 'moment/locale/zh-cn'
import config from '../config'
import { logger as initLogger, client } from '../util'

const logger = initLogger(config.API_LOG_PATH)

logger.launch(`service starts at http://localhost:${config.API_PORT}\n`)

export default async (ctx: Context, next: Function) => {
    if (config.NO_AUTH_REG.test(ctx.url)) {
        return next()
    }

    const start = moment()
    await next()

    const log: Log = {
        url: ctx.url,
        method: ctx.method,
        headers: JSON.stringify({
            'content-type': ctx.get('content-type'),
            authorization: ctx.get('authorization'),
            'x-username': ctx.get('x-username'),
        }),
    }

    if (ctx.method !== 'GET') {
        log.data = JSON.stringify(ctx.body)
    }

    let geo
    const ip = ctx.get('x-forwarded-for')
    if (ip) {
        try {
            const { lat, lon }: Indexed = await client.get(`http://ip-api.com/json/${ip}`)
            geo = { lat, lon }
        } catch (error) { } // let it be
    }

    const end = moment()
    Object.assign(log, {
        body: ctx.body,
        status: ctx.status,
        '@clientip': ip,
        '@clientgeo': geo,
        '@reqstart': start.toISOString(),
        '@reqend': end.toISOString(),
        '@duration': end.diff(start, 'milliseconds'),
    })
    logger.invoke(log)
}
