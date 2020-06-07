import Express from "express"
import Multer from "multer"
import MulterConfig from "./config/multer"
import {celebrate, Joi} from "celebrate"

import PointsController from "./controllers/pointsController"
import ItemsController from "./controllers/itemsControler"

const routes = Express.Router()
const itemsControler = new ItemsController()
const pointsController = new PointsController()
const upload = Multer(MulterConfig)

routes.get("/", (req, res) => {
    console.log(req.query)
    return res.json([
        {"apresentação": "Bem vindo"},
    ])
})

routes.get("/items", itemsControler.index)

routes.get("/points", pointsController.index)
routes.get("/points/:id", pointsController.show)
routes.post("/points", upload.single("image"), celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required().regex(/^\d+(,\d+)*/)
    })
}), pointsController.create)

export default routes