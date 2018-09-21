import { Context } from 'koa'
import { dynconfig, toolset } from '../util'

export default {

    /**
     * test dynamic config
     */
    async getDynamicConfig(ctx: Context) {
        const value = dynconfig.get(ctx.query.key)
        if (!value) throw toolset.messageErr('ConfigNotExist')

        ctx.success({
            target: value,
            all: [...dynconfig.entries()]
                .map(pair => pair.join(': '))
                .sort(),
        })
    },
}
