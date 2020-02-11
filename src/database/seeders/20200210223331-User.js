import { hashPassword } from '../../utils';

export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Uzumaki',
        lastName: 'Naruto',
        email: 'narutodattebayo@gmail.com',
        password: hashPassword('Kyubi9'),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Gbolahan',
        lastName: 'Adeleke',
        email: 'adelekegbolahan92@yahoo.com',
        password: hashPassword('Hotman92'),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Samaila',
        lastName: 'Bala',
        email: 'samailabalap@gmail.com',
        password: hashPassword('samaBala@PH'),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sasuke',
        lastName: 'Uchiha',
        email: 'sasukeuchiha@gmail.com',
        password: hashPassword('susano4sure'),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Hinata',
        lastName: 'Hyuga',
        email: 'hinataNarutokun@gmail.com',
        password: hashPassword('narutokun'),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
