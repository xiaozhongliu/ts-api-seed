import monitor from 'express-status-monitor'

export default monitor({
    title: 'Express Status',
    path: '/dashboard',
    spans: [{
        interval: 1,
        retention: 60,
    }, {
        interval: 5,
        retention: 60,
    }, {
        interval: 15,
        retention: 60,
    }],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
})
