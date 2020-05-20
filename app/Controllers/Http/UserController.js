'use strict'

const {validate} = use('Validator')
const User = use('App/Models/User')

class UserController {

  async signup({request, response}){
    const {email, password} = request.all();
    console.log(email,password);
    const validation = await validate(request.all(), {
      email: 'required|email',
      password: 'required|min:5'
    });

    if (validation.fails()){
      return response.status(400).send({message:validation.messages()})
    }

    const userFound = await User.findBy('email', email);
    if (userFound){
      return  response.send({
        message: 'Ya existe un usuario creado con ese email.'
      });
    }

    const user = await User.create({
      email,
      password
    });

    return response.status(200).send({message:'Has creado tu usuario con exito.'})
  }
}

module.exports = UserController
