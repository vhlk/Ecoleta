import axios from "axios"

const Api = axios.create({
    baseURL: "https://ecoleta1.herokuapp.com"
})

export default Api