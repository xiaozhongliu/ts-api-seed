interface Config extends Indexed {

    // basic
    API_NAME: string
    API_PORT: number

    // security
    HASH_SECRET: string
    JWT_SECRET: string
    JWT_ISSUER: string
    JWT_TOKEN_TIMEOUT: number

    // no auth stuffs
    NO_AUTH_REG: RegExp
    NO_AUTH_PATHS: string[]

    // logs location
    API_LOG_PATH: string
    TASK_LOG_PATH: string

    // http auth on logs
    HTTP_AUTH: {
        USERNAME: string
        PASSWORD: string
        ITEMS_REG: RegExp
    }

    // mailer related config
    MAILER: {
        HOST: string
        PORT: number
        USER: string
        PASS: string
        NICK_NAME: string
        RECEIVERS: string[]
    }


    DEBUG?: Boolean
    MAILER_ON?: Boolean

    REDIS?: {
        HOST: string
        PORT: number
    }

    ZOO_KEEPER?: string

    MONGO?: string

    POSTGRES?: {
        HOST: string
        BASE: string
        USER: string
        PASS: string
    }
}
