import chai from 'chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import sinonChai from 'sinon-chai';
import CartModel from '../../models/Cart';

const { expect } = chai;

chai.use(sinonChai);

describe('Test for Cart Model', () => {
  const Cart = CartModel(sequelize, dataTypes);
  const carts = new Cart();

  checkModelName(Cart)('Carts');

  context('properties', () => {
    ['userId', 'productId'].forEach(checkPropertyExists(carts));
  });
  context('associations', () => {
    const Users = 'the owner of the cart';
    const Products = 'the products in the cart';

    before(() => {
      Cart.associate({ Users });
      Cart.associate({ Products });
    });

    it('defines a belongsTo association with User', () => {
      expect(Cart.belongsTo).to.have.been.calledWith(Users, { as: 'theUser', foreignKey: 'userId' });
      expect(Cart.belongsToMany).to.have.been.calledWith(Products, { through: 'CartProducts', foreignKey: 'cartId' });
    });
  });
});
