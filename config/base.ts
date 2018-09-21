const API_NAME = 'ts-api-seed'

export default {

    // basic
    API_NAME,
    API_PORT: 9103,

    // security
    HASH_SECRET: 'vmHOX8ALwx',
    JWT_SECRET: '8LjJeMwy6AsadXJWTFFfI0AsM7MCMjr5',
    JWT_ISSUER: 'Iy1LMLSARlY9z8CbisFDfp1WJfK8iEjh',
    JWT_TOKEN_TIMEOUT: 864000, // 10 days

    // no auth stuffs
    NO_AUTH_REG: /\.log$|\.ico$|^\/socket.io/,
    NO_AUTH_PATHS: [
        `/${API_NAME}/`,
        `/${API_NAME}/monitor`,
        `/${API_NAME}/login`,
        `/${API_NAME}/register`,
    ],

    // logs location
    API_LOG_PATH: `${global.rootdir}/log/`,
    TASK_LOG_PATH: `${global.rootdir}/log/task/`,

    // http auth on logs
    HTTP_AUTH: {
        USERNAME: 'viewer',
        PASSWORD: '1234Abcd',
        ITEMS_REG: /\.log$|^\/dashboard/,
    },

    // mailer related config
    MAILER: {
        HOST: 'smtp.test.com',
        PORT: 25,
        USER: 'test@test.com',
        PASS: 'test',
        NICK_NAME: 'Service Alarm',
        RECEIVERS: [
            'test@test.com',
        ],
    },
}
