'use strict';
let options = {};
if (process.env.NODE_ENV = 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Bookings'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-03-21'),
        endDate: new Date('2023-03-25')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-01-04'),
        endDate: new Date('2023-01-11')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2023-02-10'),
        endDate: new Date('2023-02-13')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2022-11-08'),
        endDate: new Date('2022-11-11')
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date('2022-12-20'),
        endDate: new Date('2022-12-29')
      }

    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    })
  }

};
