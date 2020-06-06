import axios from "axios"

const Api = axios.create({
    baseURL: "http://192.168.0.13:4000"
})

export default Api