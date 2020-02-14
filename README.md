# Mock Shop
Mock Shop is a simple shopping server. 

[![Build Status](https://travis-ci.org/uthdev/mock-shop.svg?branch=develop)](https://travis-ci.org/uthdev/mock-shop)
[![Maintainability](https://api.codeclimate.com/v1/badges/7ba6cad888bcb8de0704/maintainability)](https://codeclimate.com/github/uthdev/mock-shop/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7ba6cad888bcb8de0704/test_coverage)](https://codeclimate.com/github/uthdev/mock-shop/test_coverage)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

---
## Features
- User can Sign Up.
- User can Sign in.
- Admin can add a Product.
- Admin can delete a Product.
- Admin can edit a Product.
- Users/Admin can see all products.
- User/Admin can see a single product.
- Users can add product to a Cart.
- A user can see product in his/her cart.
- User can delete a product from his/her cart.


---
## Management
The project development is managed on [Pivotal tracker](https://www.pivotaltracker.com/n/projects/2433511)

---
## Backend
The api is hosted on [Heroku](https://mock-mall.herokuapp.com/api/v1/)

---
## Documentation
The api is documented with Swagger on [Mock-Shop api-doc](https://mock-mall.herokuapp.com/api-docs/)


---
## Technologies Used
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com)
- [ESLint](https://eslint.org)
- [Swagger](https://swagger.io/docs/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/v5/index.html)
- [Heroku](https://devcenter.heroku.com/categories/reference)


---
## Testing Tools
- [Mocha](https://mochajs.org)
- [Chai](https://www.chaijs.com)
- [Sinon](https://sinonjs.org/)
- [NYC](https://istanbul.js.org)
- [Postman](https://www.getpostman.com)


---
## API Information
The API is hosted on [Heroku]https://mock-mall.herokuapp.com/api/v1/

METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/api/v1`
POST   | product     | Create a product               |`/api/v1/products`
GET    | product     | Get all products               |`/api/v1/products/`
PUT    | product     | Update a product               |`/api/v1/products/:productId`
GET    | product     | Get a single product           |`/api/v1/products/:productId`
DELETE | product     | Delete a product               |`/api/v1/products/:productId`
GET    | Cart        | Get User cart                  |`/api/v1/carts`
POST   | Cart        | Add product to cart            |`/api/v1/carts`
DELETE | booking     | Delete a product from cart     |`/api/v1/carts/:cartId`
POST   | User        | User signup                    |`/api/v1/auth/signup`
POST   | User        | User signin                    |`/api/v1/auth/signin`


---
#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/mock-shop.git`


#### Setup

- Installing the project's dependencies:

> run the command below

```shell
$ npm install
```

- setting up database:

> Ensure you have Postgres database set up on your machine, then create the following databases for test and development

```shell
$ createdb <dev_db> -U <db_user>

$ createdb <test_db> -U <db_user>
```

> Then create a .env file in the root directory of the project

```shell
$ touch .env
```

> Then copy the content of the .env-example file in the root directory into .env file and fill in th required parameter such as db_name, password and db_user

> Then run migrations by running the command below

```shell
$ npm run migrate

$ npm run seed
```

> To start the server, run the command below

```shell
$ npm start
```

---
## Test
- To test the app

> run test using the command below

```shell
$ npm run test
```

---
## Author

Adeleke Gbolahan Uthman