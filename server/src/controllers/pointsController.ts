import { Request, Response, response } from "express"
import Knex from "../database/connection"
import IPAdress from "../../../config"

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
            image: req.file.filename,
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

        const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: Number) => {
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

    async show(req: Request, res: Response) {
        let id = req.params.id
        const point = await Knex("points").where("id", id).first()

        if (!point) return res.status(400).json({ error: "Ponto não encontrado" });

        let items = await Knex("items").join("points_items", "points_items.item_id", "=", "items.id")
            .where("points_items.point_id", id).select("title")

    
        let localIPAdress = new IPAdress().address()

        let serializedPoint = {
            ...point,
            image_url: `http://${localIPAdress}:4000/uploads/${point.image}`
        }

        return res.json({ point: serializedPoint, items })
    }

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query

        let itens = String(items).split(",").map(item => Number(item.trim()))

        let points = await Knex("points").join("points_items", "points_items.point_id", "=", "points.id")
            .whereIn("points_items.item_id", itens)
            .where("city", String(city))
            .where("uf", String(uf))
            .distinct()
            .select("points.*")

        let localIPAdress = new IPAdress().address()

        let serializedPoints = points.map(point => {
            return {
                ...point, image_url: `http://${localIPAdress}:4000/uploads/${point.image}`
            }
        })

        return res.json(serializedPoints)
    }
}

export default pointsController