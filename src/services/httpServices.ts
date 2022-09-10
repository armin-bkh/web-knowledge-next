import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api';

export const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
