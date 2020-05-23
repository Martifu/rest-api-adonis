'use strict'
const Store = use('App/Models/Store');

class ShopController {

  async getShops({response}){

    const shops = await Store.all();
    return response.status(200).send({data:shops})

  }

  async createShops({request,response}){

    const store = new Store();
    store.name = request.body['name']
    store.address = request.body['address']
    store.phone = request.body['phone']
    await store.save();
    return response.status(200).send({message:'Tienda creada con exito', data:store})
  }

  async updateShops({request,response}){
    const store = await Store
    .query()
    .where('id', request.body['id'])
    .update({
      name : request.body['name'],
      address : request.body['address'],
      phone : request.body['phone']
    })
    const editada = await Store.query().where('id', request.body['id']).fetch()
    return response.status(200).send({message:'Tienda editada con exito', data:editada})
  }

  async deleteShops({request,response}){
    const store = await Store.find(request.body['id'])
    await store.delete()
    return response.status(200).send({message:'Tienda eliminada con exito', data:store})
  }

}

module.exports = ShopController
