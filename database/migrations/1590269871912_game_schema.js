'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
    up() {
        this.create('games', (table) => {
            table.increments()
            table.string('nombre', 254).notNullable()
            table.string('categoria', 50)
            table.string('descripcion', 254)
            table.date('fecha_lanzamiento')
            table.bigint('rate', 10)
            table.timestamps()
        })
    }

    down() {
        this.drop('games')
    }
}

module.exports = GameSchema