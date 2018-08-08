/* ******************************************************************
 * http client on the basis of axios
 ****************************************************************** */
import axios from 'axios'

axios.interceptors.response.use(({ data }) => data)

export default {

    get(url: string, params: object, headers: object) {
        return axios.get(
            url,
            {
                headers,
                params,
            },
        )
    },

    post(url: string, data: object, headers: object) {
        return axios.post(
            url,
            data,
            { headers },
        )
    },

    put(url: string, data: object, headers: object) {
        return axios.put(
            url,
            data,
            { headers },
        )
    },

    delete(url: string, headers: object) {
        return axios.delete(
            url,
            { headers },
        )
    },
}
