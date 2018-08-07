/* ******************************************************************
 * http client on the basis of axios
 ****************************************************************** */
import axios from 'axios'

axios.interceptors.response.use(({ data }) => data)

export default {

    get(url: string, params: Object, headers: Object) {
        return axios.get(
            url,
            {
                headers,
                params,
            },
        )
    },

    post(url: string, data: Object, headers: Object) {
        return axios.post(
            url,
            data,
            { headers },
        )
    },

    put(url: string, data: Object, headers: Object) {
        return axios.put(
            url,
            data,
            { headers },
        )
    },

    delete(url: string, headers: Object) {
        return axios.delete(
            url,
            { headers },
        )
    },
}
