import axios from "axios"
import IPAddress from "ipaddress"

let localIPAdress = new IPAddress().address()

const Api = axios.create({
    baseURL: `http://${localIPAdress}:4000`
})

export default Api