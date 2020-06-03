import express from "express"

const app = express()

app.listen(4000)

app.get("/", (req, res) => {
    return res.json([
        {"apresentação": "Bem vindo"},
        {"prox" : "Estamos todos juntos!"}
    ])
})