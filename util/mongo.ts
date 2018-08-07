/* ******************************************************************
 * mongo client on the basis of mongoose
 ****************************************************************** */
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate'
import config from '../config'

mongoose.plugin(paginate)
mongoose.plugin((schema: Schema) => {
    /**
     * add common fields
     */
    schema.add({ createdAt: { type: Date, default: Date.now } })
    schema.add({ updatedAt: { type: Date, default: Date.now } })

    /**
     * auto update updatedAt
     */
    const updateHandler = function (next: Function) {
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
    schema.statics.upsert = function (query: Object, data: Object) {
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
     * @param query    query conditions
     * @param pageNo   page number
     * @param pageSize page size
     * @param projection fields projection
     * @param populate   populate referenced docs. eg: { path: 'userId', select: '-_id name' }
     */
    schema.statics.page = function (query: Object, pageNo: number, pageSize: number, projection: string, populate: Object) {
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
