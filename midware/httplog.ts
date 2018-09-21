import express, { Request, Response } from 'express'
import moment from 'moment'
import 'moment/locale/zh-cn'
import config from '../config'
import { logger as initLogger, client } from '../util'

const logger = initLogger(config.API_LOG_PATH)

// add a logging aspect to the primary res.json function
// @ts-ignore
const origin = express.response.json
// @ts-ignore
express.response.json = function (json: object) {
    if (this.log) {
        this.log.resp = JSON.stringify(json)
    }
    return origin.call(this, json)
}

logger.launch(`service starts at http://localhost:${config.API_PORT}\n`)

export default (req: Request, res: Response, next: Function) => {
    if (config.NO_AUTH_REG.test(req.url) || req.method === 'OPTIONS') {
        return next()
    }

    res.start = moment()
    res.log = {
        url: req.url,
        method: req.method,
        headers: JSON.stringify({
            'content-type': req.headers['content-type'],
            authorization: req.headers.authorization,
            'x-username': req.headers['x-username'],
        }),
    }

    if (req.method !== 'GET') {
        res.log.data = JSON.stringify(req.body)
    }

    res.on('finish', async function () {
        let geo
        const ip = this.req.headers['x-forwarded-for']
        if (ip) {
            try {
                const { lat, lon }: Indexed = await client.get(`http://ip-api.com/json/${ip}`)
                geo = { lat, lon }
            } catch (error) { } // let it be
        }

        const end = moment()
        Object.assign(this.log, {
            status: this.statusCode,
            '@clientip': ip,
            '@clientgeo': geo,
            '@reqstart': this.start.toISOString(),
            '@reqend': end.toISOString(),
            '@duration': end.diff(this.start, 'milliseconds'),
        })
        logger.invoke(this.log)
    })

    next()
}
