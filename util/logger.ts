/* ******************************************************************
 * file logger on the basis of log4js
 *
 * IMPORTANT: please install a module to work under pm2 cluster mode:
 * pm2 install pm2-intercom
 ****************************************************************** */
import fs from 'fs'
import os from 'os'
import log4js, { Logger } from 'log4js'
import moment from 'moment'
import 'moment/locale/zh-cn'
import config from '../config'
import Enum from '../model/enum'
const { LogEvent } = Enum

// get host ip address
const networksOrigin = os.networkInterfaces()
const networks =
    networksOrigin.eth0 ||
    networksOrigin.eth1 ||
    networksOrigin.en0 ||
    networksOrigin.en1 ||
    networksOrigin.本地连接
const address = networks.find(network => network.family === 'IPv4')

export default (logPath: string) => {

    const layout = {
        type: 'pattern',
        pattern: '%m',
    }
    const appenders = {
        dateFile: {
            type: 'dateFile',
            category: 'APP',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            filename: logPath,
            layout,
        },
    }
    const categories = {
        default: { appenders: ['dateFile'], level: 'info' },
    }

    // non prod logs also output to console
    if (config.DEBUG) {
        // @ts-ignore
        appenders.console = { type: 'console', layout }
        categories.default.appenders.push('console')
    }

    // create the log path if it doesn't exist
    fs.existsSync(logPath) || fs.mkdirSync(logPath)

    log4js.configure({
        appenders,
        categories,
        pm2: true,
    })

    const logger = log4js.getLogger('APP')

    function log(event: string, data: object) {
        logger.info(JSON.stringify(Object.assign({
            '@appname': config.API_NAME,
            '@servername': os.hostname(),
            '@serverip': address.address,
            '@env': process.env.NODE_ENV,
            '@timestamp': moment().toISOString(),
            event,
        }, data)))
    }

    return {
        info(message: string) {
            log(LogEvent.Info, { message })
        },

        error(message: string) {
            log(LogEvent.Error, { message })
        },

        launch(message: string) {
            log(LogEvent.Launch, { message })
        },

        invoke(data: object) {
            log(LogEvent.Invoke, data)
        },
    }
}
