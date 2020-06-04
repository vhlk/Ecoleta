import Express from "express"
import Knex from "./database/connection"

import PointsController from "./controllers/pointsController"
import ItemsController from "./controllers/itemsControler"

const routes = Express.Router()
const itemsControler = new ItemsController()
const pointsController = new PointsController()

routes.get("/", (req, res) => {
    console.log(req.query)
    return res.json([
        {"apresentação": "Bem vindo"},
    ])
})

routes.get("/items", itemsControler.index)

routes.get("/points", pointsController.index)
routes.post("/points", pointsController.create)
routes.get("/points/:id", pointsController.show)

export default routes