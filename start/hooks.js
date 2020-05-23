'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(()=>{
  const Exception = use('Exception');

  Exception.handle('InvalidJwtToken', (error, {response})=>{
    return response.status(403).send('No estás autenticado');
  })
})
