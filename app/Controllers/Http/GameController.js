'use strict'

const Game = use('App/Models/Game');
const { validate } = use('Validator')
const Database = use('Database')

class GameController {

    async getGames({ response }) {
        
        const games = await Database.select('*').from('games');
        return response.status(200).send({ 'status': 'ok', data: games });

    }

    async getGameId({response, request}){
        const id = request.params.id;
        console.log(id);
        const game = await Database.select('*').from('games').where('id', id);
        return response.status(200).send({'status:':'ok', data:game});
    }


    async createGame({ request, response }) {

        const { nombre, categoria, rate, fecha_lanzamiento, descripcion } = request.all();

        const validator = await validate(request.all(), {
            nombre: 'required',
            categoria: 'required',
            rate: 'required',
            fecha_lanzamiento: 'required',
            descripcion: 'required'
        })

        if (validator.fails()) {
            return response.status(400).send({ status: 'error', data: validator.messages() });
        }

        const cGame = await Game.create({
            nombre,
            categoria,
            rate,
            fecha_lanzamiento,
            descripcion
        });

        return response.status(200).send({ 'status': 'ok', data: cGame });
    }

    async editGame({ request, response }) {
        const { id, nombre, categoria, rate, fecha_lanzamiento, descripcion } = request.all();


        const game = await Database
            .table('games')
            .where('id', id)
            .update({
                nombre,
                categoria,
                rate,
                fecha_lanzamiento,
                descripcion
            });

        return response.status(200).send({ "status": "ok", data: game });

    }

    async delGame({ request, response }) {
        const { id } = request.all();


        const game = await Database
            .table('games')
            .where('id', id)
            .delete()
        return response.status(200).send({ "status": "ok", data: game });

    }


}

module.exports = GameController