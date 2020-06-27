import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333'
    //baseURL: 'https://356ddd758aa1.ngrok.io'
})

export default api