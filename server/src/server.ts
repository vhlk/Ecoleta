import Express from "express"
import Routes from "./routes"
import Path from "path"
import cors from "cors"

const app = Express()
app.use(Express.json())
app.use(Routes)

app.use(cors())

app.use("/uploads", Express.static(Path.resolve(__dirname, "..", "uploads")))

app.listen(4000)