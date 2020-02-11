import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import app from '../../index';
import models from '../../models';
import controllers from '../../controllers';

const { ProductController } = controllers;
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
  inStock: faker.random.boolean()
};

let request;
describe('PRODUCT CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('Add Product', () => {
    const req = {
      body: {}
    };
  
    const res = {
      status: () => {},
      json: () => {},
    };
    it('should respond with a status 201 and create a new product', async () => {
      const admin = await request
        .post('/api/v1/auth/signin')
        .send(adminUser);
      const adminToken = admin.body.data.token;
      const res = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(product);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 403 when user is not admin', async () => {
      const user = await request
        .post('/api/v1/auth/signin')
        .send(nonAdmin);
      const userToken = user.body.data.token;
      const res = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(product);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Unauthorized! Accessible to admin only');
    });
    it('should respond with a status 401 when Authorization is not set', async () => {
      const res = await request
        .post('/api/v1/products')
        .send(product);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
    it('should respond with a status 401 when Bearer token is not provided', async () => {
      const res = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${''}` })
        .send(product);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
    it('should respond with a status 403 when Bearer token is invalid', async () => {
      const res = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${'kanldfoajfnakga'}` })
        .send(product);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
    it('fakes server error when creating product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'create').throws();

      await ProductController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  context('Get All Products', () => {
    const req = {
      body: {}
    };

    const res = {
      status: () => {},
      json: () => {}
    };
    it('should respond with a status 200 and get all products', async () => {
      const admin = await request
        .post('/api/v1/auth/signin')
        .send(adminUser);
      const adminToken = admin.body.data.token;
      const res = await request
        .get('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('fakes server error when getting all products', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findAll').throws();

      await ProductController.getProducts(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  context('Get Single product', () => {
    const req = {
      body: {},
      params: {
        productId: 1
      }
    };

    const res = {
      status: () => {},
      json: () => {}
    };
    it('should respond with a status 200 and get a single product', async () => {
      const admin = await request
        .post('/api/v1/auth/signin')
        .send(adminUser);
      const adminToken = admin.body.data.token;
      const newProduct = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(product);
      const productId = newProduct.body.data.id;
      const res = await request
        .get(`/api/v1/products/${productId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('fakes a 404 Not found error when getting a product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').returns(null);

      await ProductController.getSingleProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes server error when getting a product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').throws();

      await ProductController.getSingleProduct(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  context('Update Product', () => {
    const req = {
      body: {},
      params: {
        productId: 1
      }
    };

    const res = {
      status: () => {},
      json: () => {}
    };
    it('should respond with a status 200 and update the product', async () => {
      const admin = await request
        .post('/api/v1/auth/signin')
        .send(adminUser);
      const adminToken = admin.body.data.token;
      const newProduct = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(product);
      const productId = newProduct.body.data.id;
      const res = await request
        .put(`/api/v1/products/${productId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(product);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('fakes a 404 Not found error when updating a product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').returns(null);

      await ProductController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes server error when updating a product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findByPk').returns(product);
      sinon.stub(models.Products, 'update').throws();

      await ProductController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  context('Delete Product', () => {
    const req = {
      params: {
        productId: 1,
      }
    };
  
    const res = {
      status: () => {},
      json: () => {},
    };
    it('should respond with a status 200 and delete the product', async () => {
      const admin = await request
        .post('/api/v1/auth/signin')
        .send(adminUser);
      const adminToken = admin.body.data.token;
      const newProduct = await request
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(product);
      const productId = newProduct.body.data.id;
      const res = await request
        .delete(`/api/v1/products/${productId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });
    it('fakes a 404 Not found error when deleting a product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findOne').returns(null);

      await ProductController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes server error when deleting a product', async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Products, 'findOne').returns(product);
      sinon.stub(models.Products, 'destroy').throws();

      await ProductController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
