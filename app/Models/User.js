'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

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
      password,
      email_verified: false
    });

    const token = jwt.sign({email:user.email}, Env.get('SECRET'),{
      expiresIn: 60 * 60 * 24 * 3,
    });

    const params = {
      ...user.toJSON(),
      token,
      appUrl: Env.get('APP_URL'),
    };

    await Mail.send('emails.confirm_account', params, (message)=>{
      message
        .to(user.email)
        .from(Env.get('FROM_EMAIL'))
        .subject('Confirm your account')
    });

    return response.status(200).send({message:'Has creado tu usuario con exito, enviamos un correo de confirmacion para que puedas iniciar sesión.'})
  }
}

module.exports = User
