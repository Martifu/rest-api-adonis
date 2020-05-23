'use strict'
const Store = use('App/Models/Store');

class ShopController {

  async getShops(){

    const shops = await Store.all();
    return shops;

  }
}

module.exports = ShopController
