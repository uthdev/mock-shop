import chai from 'chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import sinonChai from 'sinon-chai';
import ProductModel from '../../models/Product';

const { expect } = chai;

chai.use(sinonChai);

describe('Test for Product Model', () => {
  const Product = ProductModel(sequelize, dataTypes);
  const products = new Product();

  checkModelName(Product)('Products');

  context('properties', () => {
    ['name', 'description', 'category', 'price', 'imageUrl', 'inStock'].forEach(checkPropertyExists(products));
  });
  context('associations', () => {
    const Cart = 'the carts the product belongs to';

    before(() => {
      Product.associate({ Cart });
    });

    it('defined a belongsToMany association with Cart', () => {
      expect(Product.belongsToMany).to.have.been.calledWith(Cart, { as: 'cart', through: 'cartProduct', foreignKey: 'productId' });
    });
  });
});
