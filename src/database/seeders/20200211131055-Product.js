import faker from 'faker';

export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Products',
    [
      {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        category: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        imageUrl: faker.image.imageUrl(),
        inStock: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        category: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        imageUrl: faker.image.imageUrl(),
        inStock: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        category: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        imageUrl: faker.image.imageUrl(),
        inStock: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        category: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        imageUrl: faker.image.imageUrl(),
        inStock: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        category: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        imageUrl: faker.image.imageUrl(),
        inStock: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Products', null, {})
};
