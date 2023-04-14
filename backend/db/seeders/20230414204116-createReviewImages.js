'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'ReviewImages'
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
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720426520237441315/original/3995dd85-ea71-4eb7-9380-6a4413d109eb.jpeg?im_w=1440'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53669775/original/04471436-b37c-4846-84a4-ea83d871c95c.jpeg?im_w=1440'
      },
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54078699/original/c4a2ba3f-da40-4b8e-ab45-f08cfa40ea3d.jpeg?im_w=1440'
      },
      {
        reviewId: 4,
        url: 'https://content.r9cdn.net/rimg/himg/64/c2/3a/expediav2-5368781-3321499987-335910.jpg?width=1200&height=630&crop=true'
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
    await queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4]
      }
    })
  }
};
