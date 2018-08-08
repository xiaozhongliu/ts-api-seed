import { promisify } from 'util'
import { redis } from '../util'

const set = promisify(redis.set).bind(redis)
const get = promisify(redis.get).bind(redis)
const del = promisify(redis.del).bind(redis)
const hset = promisify(redis.hset).bind(redis)
const hget = promisify(redis.hget).bind(redis)
const hdel = promisify(redis.hdel).bind(redis)

export default {

    /**
     * set value of a key
     * @param key      key
     * @param value    value
     * @param duration duration in seconds
     */
    async set(key: string, value: string, duration: number) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        if (duration) {
            return set(key, value, 'EX', duration)
        }
        return set(key, value)
    },

    /**
     * get value of a key
     * @param key key
     */
    async get(key: string) {
        const value = await get(key)
        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },

    /**
     * delete a key
     * @param key key
     */
    async del(key: string) {
        return del(key)
    },

    /**
     * set value of a hash field
     * @param key   hash key
     * @param field field name
     * @param value field value
     */
    async hset(key: string, field: string, value: string) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return hset(key, field, value)
    },

    /**
     * get value of a hash field
     * @param key   hash key
     * @param field field name
     */
    async hget(key: string, field: string) {
        const value = await hget(key, field)
        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },

    /**
     * delete one or more hash fields
     * @param key   hash key
     * @param field field name(s)
     */
    async hdel(key: string, field: string | string[]) {
        return hdel(key, field)
    },
}
