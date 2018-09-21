const cpuCount = require('os').cpus().length
console.log('cpu count is:', cpuCount)

const MAX_INS = cpuCount > 4 ? 4 : cpuCount
const API_NAME = 'ts-api-seed'

const isPrimary = process.env.IS_PRIMARY_ENDPOINT
console.log('is primary endpoint:', isPrimary || false)

const apps = [
    {
        name: API_NAME,
        script: './dist/app.js',
        instances: process.argv[5] ? 1 : MAX_INS,
        exec_mode: 'cluster',
        out_file: `../pm2log/${API_NAME}.log`,
        error_file: `../pm2log/${API_NAME}.log`,
        log_date_format: 'YYYY-MM-DD HH:mm:ss ',
        merge_logs: true,
        env: {
            NODE_ENV: 'prod',
        },
        env_qa: {
            NODE_ENV: 'qa',
        },
        env_int: {
            NODE_ENV: 'int',
        },
        env_dev: {
            NODE_ENV: 'dev',
        },
    },
]

// run tasks only on primary endpoint
if (isPrimary) {
    [
        'test-task',
    ].forEach(taskName => apps.push({
        name: taskName,
        script: `./dist/task/${taskName}.js`,
        instances: 1,
        exec_mode: 'cluster',
        out_file: `../pm2log/${taskName}.log`,
        error_file: `../pm2log/${taskName}.log`,
        log_date_format: 'YYYY-MM-DD HH:mm:ss ',
        merge_logs: true,
        env: {
            NODE_ENV: 'prod',
        },
        env_qa: {
            NODE_ENV: 'qa',
        },
        env_int: {
            NODE_ENV: 'int',
        },
        env_dev: {
            NODE_ENV: 'dev',
        },
    }))
}

module.exports = { apps }
