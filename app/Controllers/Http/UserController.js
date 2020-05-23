'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')

class UserController {


    async login({ request, auth, response }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);

        if (validation.fails()) {
            return response.status(400).send({ "message": validation.messages() });
        }

        const user = await User.findBy('email', email)
        if (!user) {
            return response.status(400).send({ "message": "No existe este email" });
        }

        const isSame = Hash.verify(password, user.password);
        if (!isSame) {
            return response.status(400).send('Contraseña incorrecta');
        }

        try {
            const token = await auth.attempt(email, password);
            return response.status(200).send({ 'message': "Ok", data: token });
        } catch (error) {
            return response.status(400).send({ 'message': error });
        }


    }

    async updateUser({ request, response }) {
        const validation = await validate(request.all(), {
            username: 'required',
            f_name: 'required',
            l_name: 'required',
            password: 'required|min:5'
        });

        if (validation.fails()) {
            return response.status(400).send({ message: validation.messages() })
        }

        const user = await User
            .query()
            .where('id', request.body['id'])
            .update({
                username: request.body['username'],
                f_name: request.body['f_name'],
                l_name: request.body['l_name'],
                password: request.body['password']
            })
        const editado = await User.query().where('id', request.body['id']).fetch()
        return response.status(200).send({ message: 'Usuario editado con exito', data: editado })
    }


    async signup({ request, response }) {
        const { email, password, username, f_name, l_name } = request.all();
        console.log(email, password);
        const validation = await validate(request.all(), {
            email: 'required|email',
            username: 'required',
            f_name: 'required',
            l_name: 'required',
            password: 'required|min:5'
        });

        if (validation.fails()) {
            return response.status(400).send({ message: validation.messages() })
        }

        const userFound = await User.findBy('email', email);
        if (userFound) {
            return response.send({
                message: 'Ya existe un usuario creado con ese email.'
            });
        }

        const user = await User.create({
            email,
            password,
            username,
            f_name,
            l_name
        });

        return this.login(...arguments);

        //return response.status(200).send({message:'Has creado tu usuario con exito.'})
    }
}

module.exports = UserController