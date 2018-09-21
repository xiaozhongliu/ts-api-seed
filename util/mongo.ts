/* ******************************************************************
 * mongo client on the basis of mongoose
 ****************************************************************** */
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate'
import config from '../config'

mongoose.plugin(paginate)
mongoose.plugin((schema: mongoose.Schema) => {

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
    schema.statics.upsert = function (query: object, data: object) {
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
     * @param lean     return plain javascript objects
     * @param sort     sort option
     */
    schema.statics.page = function (
        query: object,
        pageNo: number,
        pageSize: number,
        projection: string,
        populate: object,
        lean: Boolean = true,
        sort: string = '-createdAt',
    ) {
        return this.paginate(
            query,
            {
                page: pageNo || 1,
                limit: pageSize || 10,
                select: projection,
                populate,
                lean,
                leanWithId: false,
                sort: sort,
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
