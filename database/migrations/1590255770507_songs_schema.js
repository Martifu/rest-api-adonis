'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SongsSchema extends Schema {
  up () {
    this.create('songs', (table) => {
      table.increments()
      table.string('nombre', 254).notNullable()
      table.string('autor', 254).notNullable()
      table.string('album', 254).notNullable()
      table.string('fecha', 254).notNullable()
      table.string('genero', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('songs')
  }
}

module.exports = SongsSchema
