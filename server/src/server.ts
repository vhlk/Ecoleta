import Express from "express"
import Routes from "./routes"
import Path from "path"
import cors from "cors"
import {errors} from "celebrate"

const app = Express()
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

app.use(Express.json())
app.use(Routes)

app.use(cors())

app.use("/uploads", Express.static(Path.resolve(__dirname, "..", "uploads")))

app.use(errors())

app.listen(4000)