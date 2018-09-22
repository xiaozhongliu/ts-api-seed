interface Log {

    url: string
    method: string
    headers: string
    action?: string
    data?: string
    resp?: string
    status?: number
    '@clientip'?: string
    '@reqstart'?: string
    '@clientgeo'?: object
    '@reqend'?: string
    '@duration'?: number
}