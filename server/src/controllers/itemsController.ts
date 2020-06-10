import { Request, Response } from "express"
import Knex from "../database/connection"
import IPAdress from "../../../config"

class itemsController {

    async index(req: Request, res: Response) {
        const items = await Knex("items").select("*")
        let address = "https://ecoleta1.herokuapp.com"
        let serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${address}:4000/uploads/${item.image}`
            }
        })
        return res.send(serializedItems)
    }
}

export default itemsController
