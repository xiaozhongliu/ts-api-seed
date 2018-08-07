import { Request, Response } from 'express'

export default (req: Request, res: Response, next: Function) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'content-type,authorization')
    next()
}
