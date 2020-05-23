'use strict'

const {validate} = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')

class UserController {


  async login({request, auth ,response}){
    const {email, password} = request.all();
    const token = await auth.attempt(email, password);
    
    return response.status(200).send({'message':"Iniciado", data:token});
  }


  async signup({request, response}){
    const {email, password, username, f_name, l_name} = request.all();
    console.log(email,password);
    const validation = await validate(request.all(), {
      email: 'required|email',
      username: 'required',
      f_name: 'required',
      l_name: 'required',
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
      password,
      username,
      f_name,
      l_name
    });

    return this.login(...arguments);

    //return response.status(200).send({message:'Has creado tu usuario con exito.'})
  }



  async  login({request,response,auth}){
    const {email,password} = request.all();
    const validation = await validate(request.all(),{
      email:'required',
      password:'required'
    });

    if (validation.fails()){
      return response.send({message:validation.messages()})
    }

    const user = await User.findBy('email', email);
    if (!user){
      return response.send({message:'No existe un usuario con ese email'})
    }



    const isSame = await Hash.verify(password,user.password);
    if (!isSame){
      return response.send({message:'Contraseña incorrecta'})
    }


    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.json({"access_token": accessToken})
      }

    }
    catch (e) {
      return response.json({message: 'You first need to register!'})
    }
  }}

module.exports = UserController
