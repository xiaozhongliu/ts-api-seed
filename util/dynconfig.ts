/* ******************************************************************
 * dynamic config on the basis of zookeeper config center
 ****************************************************************** */
import ZK, { Event } from 'node-zookeeper-client'
import { promisify } from 'util'
import config from '../config'

const zookeeper = ZK.createClient(config.ZOO_KEEPER)
zookeeper.once('connected', getAllConfigs)
zookeeper.connect()

const getChildren = promisify(zookeeper.getChildren).bind(zookeeper)
const getData = promisify(zookeeper.getData).bind(zookeeper)
const path = `/config/${config.API_NAME}/${process.env.NODE_ENV}`

/**
 * local config cache, change on it is only triggered by config center
 */
const dynconfig = new Map<string, string>()

/**
 * fetch keys of all config nodes
 * start watching on config nodes creation or removal
 */
async function getAllConfigs() {
    try {
        const localKeys = [...dynconfig.keys()]

        const children = await getChildren(
            path,
            (event: Event) => {
                console.log('[config center] => [%s] %s', getAllConfigs.name, event.name)
                getAllConfigs()
            },
        )
        console.log('[config center] => below are latest config items fetched')
        await Promise.all(children.sort().map((key: string) => {
            const isNewKey = !localKeys.includes(key)
            return getConfig(key, isNewKey)
        }))

        // remove deleted config node from local config cache
        localKeys.forEach(key => {
            if (!children.includes(key)) {
                dynconfig.delete(key)
            }
        })
    } catch (error) {
        console.log('zookeeper error:', error)
    }
}

/**
 * fetch value of a config node
 * start watching on config node value update
 */
async function getConfig(key: string, addWatcher?: boolean) {
    const rawValue = await getData(
        `${path}/${key}`,
        // register a watcher only once
        !addWatcher ? undefined : (event: Event) => {
            console.log('[config center] => [%s] %s', getConfig.name, event.name)
            if (event.type !== Event.NODE_DELETED) {
                getConfig(key, true)
            }
        },
    )
    const value = rawValue.toString('utf8')
    console.log('    %s: %s', key, value)
    dynconfig.set(key, value)
}

export default dynconfig
