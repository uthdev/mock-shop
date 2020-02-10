import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../index';
import models from '../../models';
import controllers from '../../controllers';

const { AuthController } = controllers;
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const dummyUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

let request;
describe('AUTH CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('User Signup', () => {
    const req = {
      body: {
        email: 'fakemail@mail.com',
      }
    };

    const res = {
      status: () => {},
      json: () => {},
    };

    it('should respond with a status 201 and create a new account', async () => {
      const res = await request
        .post('/api/v1/auth/signup')
        .send(dummyUser);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 400 and fail validation', async () => {
      const badRequest = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
      };
      const res = await request
        .post('/api/v1/auth/signup')
        .send(badRequest);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
    it('fake conflict error and return a status 409', async () => {
      const user = {
        id: 'ksd095',
        email: 'fakemail@mail.com',
        password: '9ijk3632',
        createdAt: '2010/10/10'
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').returns(user);

      await AuthController.signUp(req, res);
      expect(res.status).to.have.been.calledWith(409);
    });
    it('fakes server error when creating account', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').throws();

      await AuthController.signUp(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
