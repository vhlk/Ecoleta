import { Request, Response, response } from "express"
import Knex from "../database/connection"

class pointsController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body

        const trx = await Knex.transaction()

        let details = {
            image: "https://images.unsplash.com/photo-1591167844762-3c3456a61d8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        let insertedId = await trx("points").insert(details)


        let point_id = insertedId[0]

        const pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id
            }
        })

        await trx("points_items").insert(pointItems)

        await trx.commit()

        return res.json({
            id: point_id,
            ...details
        })
    }

    async show(req: Request, res: Response){
        let id = req.params.id
        const point = await Knex("points").where("id", id).first()

        if (!point) return res.status(400).json({error: "Ponto não encontrado"});

        let items = await Knex("items").join("points_items", "points_items.item_id", "=", "items.id")
            .where("points_items.point_id", id).select("title")
        return res.json({point, items})
    }

    async index(req: Request, res: Response) {
        const {city, uf, items} = req.query
        
        let itens = String(items).split(",").map(item => Number(item.trim()))

        let points = await Knex("points").join("points_items", "points_items.point_id", "=", "points.id")
            .whereIn("points_items.item_id", itens)
            .where("city", String(city))
            .where("uf", String(uf))
            .distinct()
            .select("points.*")
        
        return res.json(points)
    }
}

export default pointsController