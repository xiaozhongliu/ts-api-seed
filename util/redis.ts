/* ******************************************************************
 * redis client on the basis of node_redis
 ****************************************************************** */
import Redis from 'redis'
import config from '../config'

export default Redis.createClient({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT,
    retry_strategy(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // end reconnecting on a specific error and flush all
            // commands with a individual error
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // end reconnecting after a specific timeout and flush
            // all commands with a individual error
            return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
            // end reconnecting with built in error
            return new Error('Retry count exhausted')
        }
        // reconnect after
        return Math.min(options.attempt * 100, 5000)
    },
})
