import axios from "axios"

let address = "https://ecoleta1.herokuapp.com"

const Api = axios.create({
    baseURL: address
})

export default Api