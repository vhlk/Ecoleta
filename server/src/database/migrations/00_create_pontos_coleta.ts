import Knex from "knex"

export async function up(knex: Knex) {
    return knex.schema.createTable("points", table => {
        table.increments("id").unique().primary()
        table.string("name").notNullable()
        table.string("image").notNullable()
        table.string("email").notNullable()
        table.string("whatsapp").notNullable()
        table.string("latitude").notNullable()
        table.string("longitude").notNullable()
        table.string("city").notNullable()
        table.string("uf", 2).notNullable()
    })
}

export async function down(knex: Knex) {
    knex.schema.dropTable("points")
}