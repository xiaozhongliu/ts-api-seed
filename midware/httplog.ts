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

    ctx.start = moment()
    ctx.log = {
        url: ctx.url,
        method: ctx.method,
        headers: JSON.stringify({
            'content-type': ctx.get('content-type'),
            authorization: ctx.get('authorization'),
            'x-username': ctx.get('x-username'),
        }),
    }
    if (ctx.method !== 'GET') {
        ctx.log.body = JSON.stringify(ctx.body)
    }

    await next()

    setImmediate(async () => {
        let geo
        const ip = '183.192.63.4'// ctx.get('x-forwarded-for')
        if (ip) {
            try {
                const { latitude, longitude }: Indexed = await client.get(`https://ipstack.com/ipstack_api.php?ip=${ip}`)
                geo = { lat: latitude, lon: longitude }
            } catch (error) { } // let it be
        }

        const end = moment()
        Object.assign(ctx.log, {
            resp: JSON.stringify(ctx.body),
            status: ctx.status,
            '@clientip': ip,
            '@clientgeo': geo,
            '@reqstart': ctx.start.toISOString(),
            '@reqend': end.toISOString(),
            '@duration': end.diff(ctx.start, 'milliseconds'),
        })
        logger.invoke(ctx.log)
    })
}
