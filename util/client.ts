/* ******************************************************************
 * http client on the basis of axios
 ****************************************************************** */
import axios from 'axios'

export default {

    async get<T>(url: string, params?: object, headers?: object) {
        const res = await axios.get<T>(
            url,
            {
                headers,
                params,
            },
        )
        return res.data
    },

    async post(url: string, data: object, headers?: object) {
        const res = await axios.post(
            url,
            data,
            { headers },
        )
        return res.data
    },

    async put(url: string, data: object, headers?: object) {
        const res = await axios.put(
            url,
            data,
            { headers },
        )
        return res.data
    },

    async delete(url: string, headers?: object) {
        const res = await axios.delete(
            url,
            { headers },
        )
        return res.data
    },
}
