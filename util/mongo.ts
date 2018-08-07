/* ******************************************************************
 * mongo client on the basis of mongoose
 ****************************************************************** */
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate'
import config from '../config'

mongoose.plugin(paginate)
mongoose.plugin((schema) => {
    /**
     * add common fields
     */
    schema.add({ createdAt: { type: Date, default: Date.now } })
    schema.add({ updatedAt: { type: Date, default: Date.now } })

    /**
     * auto update updatedAt
     */
    const updateHandler = function (next) {
        this._update.updatedAt = new Date()
        next()
    }
    schema.pre('update', updateHandler)
    schema.pre('updateOne', updateHandler)
    schema.pre('findOneAndUpdate', updateHandler)
    schema.pre('updateMany', updateHandler)

    /**
     * insert or update
     */
    schema.statics.upsert = function (query, data) {
        return this.findOneAndUpdate(
            query,
            data,
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            },
        )
    }

    /**
     * paged query
     * @param {object} query    query conditions
     * @param {number} pageNo   page number
     * @param {number} pageSize page size
     * @param {string} projection   fields projection
     * @param {object} populate     populate referenced docs. eg: { path: 'userId', select: '-_id name' }
     */
    schema.statics.page = function (query, pageNo, pageSize, projection, populate) {
        return this.paginate(
            query,
            {
                select: projection,
                populate,
                page: pageNo || 1,
                limit: pageSize || 10,
                sort: '-createdAt',
                lean: true,
                leanWithId: false,
            },
        )
    }
})

mongoose.connect(config.MONGO, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    poolSize: 20,
})

export default mongoose
