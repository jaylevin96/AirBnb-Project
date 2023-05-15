'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Reviews'
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
    await queryInterface.bulkInsert(options, [
      {
        spotId: '1',
        userId: '2',
        review: 'Perfect place for Knoxville!!!',
        stars: 5
      },
      {
        spotId: '2',
        userId: '3',
        review: 'West Loop is really picking up in Chicago. This place had the perfect views. Was a little dirty.',
        stars: 4
      },
      {
        spotId: '3',
        userId: '1',
        review: 'This was our first time in Ozark and could not imagine a better place to stay. Right on the water and quick access to kayaks and canoes!',
        stars: 5
      },
      {
        spotId: '4',
        userId: '3',
        review: 'Would never stay here again! The place was infested with bugs and there was no AC!',
        stars: 1
      },
      {
        spotId: '5',
        userId: '2',
        review: 'Could not imagine a more perfect place for LA',
        stars: 5
      },
      {
        spotId: '5',
        userId: '3',
        review: 'Little small but very clean',
        stars: 4
      },
      {
        spotId: '6',
        userId: '1',
        review: 'Would recommend this spot to anyone visiting NOLA!',
        stars: 5
      },
      {
        spotId: '7',
        userId: '2',
        review: 'Pretty decent. A bit small but the host is very friendly.',
        stars: 3
      },
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
    await queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4]
      }
    })
  }
};
