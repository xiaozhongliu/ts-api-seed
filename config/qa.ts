export default {

    DEBUG: false,
    MAILER_ON: true,

    REDIS: {
        HOST: '127.0.0.1',
        PORT: 6379,
    },

    ZOO_KEEPER: 'localhost:2181,localhost:2181',

    MONGO: 'mongodb://test:test@127.0.0.1:27017/test',

    POSTGRES: {
        HOST: '127.0.0.1',
        BASE: 'test',
        USER: 'test',
        PASS: 'test',
    },
}
