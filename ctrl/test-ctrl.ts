import { Request, Response } from 'express'
import { dynconfig, toolset } from '../util'

export default {

    /**
     * test dynamic config
     */
    async getDynamicConfig(req: Request, res: Response) {
        const value = dynconfig.get(req.query.key)
        if (!value) throw toolset.messageErr('ConfigNotExist')

        res.success({
            target: value,
            all: [...dynconfig.entries()]
                .map(pair => pair.join(': '))
                .sort(),
        })
    },
}
