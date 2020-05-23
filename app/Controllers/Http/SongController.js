'use strict'

const Database = use('Database')


class SongController {

  async getCanciones({response}){
    const canciones = await Database.select('*').from('songs');

    response.status(200).send({data:canciones})
  }

  async nuevaCancion({request,response}){
    const {nombre,autor,album,fecha,genero} = request.all()
    const song = await Database
      .table('songs')
      .insert({
        nombre: nombre,
        autor:autor,
        album:album,
        fecha:fecha,
        genero:genero
      })
    const creada = await Database.from('songs').where('nombre', nombre)
    return response.status(200).send({message:'Cancion creada con exito', data:creada})
  }

  async editarCancion({request,response}){
    const {id,nombre,autor,album,fecha,genero} = request.all()

    const song = await Database
      .table('songs')
      .where('id',id)
      .update({
        nombre: nombre,
        autor:autor,
        album:album,
        fecha:fecha,
        genero:genero
      })

    console.log(nombre)
    const editada = await Database.from('songs').where('nombre', nombre)
    return response.status(200).send({message:'Cancion editada con exito', data:editada})
  }

  async eliminarUsuario({request,response}){
    const {id} = request.all()
    const eliminado = await Database
      .table('users')
      .where('id', id)
      .delete()
    return response.status(200).send({message:'Cancion eliminada'})

  }
}

module.exports = SongController
