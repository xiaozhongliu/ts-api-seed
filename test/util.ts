// use same root directory for node and ts-node
global.rootdir = __dirname

import supertest from 'supertest'
import config from '../config'
import server from '../app'

const request = {

    client: supertest(server),

    get(url: string) {
        return this.client.get(`/${config.API_NAME}${url}`)
    },

    post(url: string) {
        return this.client.post(`/${config.API_NAME}${url}`)
    },

    put(url: string) {
        return this.client.put(`/${config.API_NAME}${url}`)
    },

    delete(url: string) {
        return this.client.delete(`/${config.API_NAME}${url}`)
    },
}

export {
    request,
}
