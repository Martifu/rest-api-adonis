'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
    //borror
    // Route.post('usuarios/login', 'UserController.login');
    // Route.post('usuarios/emilinarUsuario','UserController.eliminarUsuario').middleware(['auth']);
    Route.post('usuarios/signup', 'UserController.signup');
    Route.get('canciones/get', 'SongController.getCanciones');
    Route.post('canciones/crear', 'SongController.nuevaCancion').middleware(['auth'])
    Route.post('canciones/editar', 'SongController.editarCancion').middleware(['auth'])
    Route.post('canciones/eliminar', 'SongController.eliminarCancion').middleware(['auth'])





    //Rutas Daniel
    Route.post('usuarios/login', 'UserController.login');
    Route.get('juegos/get', 'GameController.getGames');
    Route.post('juegos/registrar', 'GameController.createGame').middleware(['auth']);
    Route.post('juegos/editar', 'GameController.editGame').middleware(['auth']);
    Route.post('juegos/eliminar', 'GameController.delGame').middleware('auth');

}).prefix('api/')