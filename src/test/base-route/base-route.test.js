import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

const { expect } = chai;

describe('GENERAL TEST', () => {
  it('should respond with a status code 404 if there if route is invalid', async () => {
    const res = await chai.request(app)
      .get('/auth/signin');
    expect(res).to.have.status(404);
    expect(res.body.status).to.equal('error');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Endpoint not found! Go to the homepage using: /api/v1');
  });
  it('should respond with a status code 200 if user visit the root of the app', async () => {
    const res = await chai.request(app)
      .get('/api/v1');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
});
