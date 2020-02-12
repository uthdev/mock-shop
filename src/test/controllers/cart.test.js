import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import app from '../../index';
import models from '../../models';
import controllers from '../../controllers';

const { CartController } = controllers;
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const adminUser = {
  email: 'adelekegbolahan92@yahoo.com',
  password: 'Hotman92'
};

const nonAdmin = {
  email: 'narutodattebayo@gmail.com',
  password: 'Kyubi9'
};

const product = {
  name: faker.commerce.productName(),
  description: faker.lorem.sentence(),
  category: faker.commerce.productMaterial(),
  price: faker.commerce.price(),
  imageUrl: faker.image.imageUrl(),
  inStock: true
};

let request;
describe('PRODUCT CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('Add to Cart', () => {
    const req = {
      body: {
        productId: 1
      },
      user: {
        userId: 1
      }
    };

    const res = {
      status: () => {},
      json: () => {}
    };
    it('should return a status 201 and add the product to cart', async () => {
      const admin = await request
        .post('/api/v1/auth/signin')
        .send(adminUser);
      const adminToken = admin.body.data.token;
      const newProduct = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(product);
      const productId = newProduct.body.data.id;
      const user = await request
        .post('/api/v1/auth/signin')
        .send(nonAdmin);
      const userToken = user.body.data.token;
      const res = await request
        .post('/api/v1/carts')
        .set({ Authorization: `Bearer ${userToken}` })
        .send({ productId });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('fakes a 404 Not found error when adding product to cart', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').returns(null);

      await CartController.addToCart(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes a 403 forbidden error when product is Out of Stock', async () => {
      const outOfStock = {
        inStock: false
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').returns(outOfStock);

      await CartController.addToCart(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });
    it('fakes server error when adding product to cart', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').returns(product);
      sinon.stub(models.Carts, 'create').throws();

      await CartController.addToCart(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
