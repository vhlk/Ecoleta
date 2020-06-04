import Knex from "knex"
import Path from "path"

const connection = Knex({
    client: "sqlite3",
    connection: {
        filename: Path.resolve(__dirname, "database.sqlite")
    },
    useNullAsDefault: true
})

export default connection