import chai from 'chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import sinonChai from 'sinon-chai';
import UserModel from '../../models/User';

const { expect } = chai;

chai.use(sinonChai);

describe('Test for User Model', () => {
  const User = UserModel(sequelize, dataTypes);
  const users = new User();

  checkModelName(User)('Users');

  context('properties', () => {
    ['firstName', 'lastName', 'email', 'password', 'isAdmin'].forEach(checkPropertyExists(users));
  });
  context('associations', () => {
    const Carts = 'the user that owns a cart';

    before(() => {
      User.associate({ Carts });
    });

    it('defined a hasOne association with Cart', () => {
      expect(User.hasOne).to.have.been.calledWith(Carts, { as: 'userCart', foreignKey: 'userId' });
    });
  });
});
