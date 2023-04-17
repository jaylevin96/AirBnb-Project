'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots'
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
     *
    */
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1495 View Point Lane',
        city: 'Knoxville',
        state: 'Tennessee',
        country: 'United States',
        lat: 35.96,
        lng: -83.92,
        name: 'Lavish Lake Getaway',
        description: `There is no better way to experience the beauty of Loudoun Lake than by sleeping right in the heart of it with breathtaking lake views.
        Everything about it seems to come from a fantasy novel.`,
        price: 384
      },
      {
        ownerId: 1,
        address: '1124 N Clark St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 41.88,
        lng: -87.55,
        name: 'Cloud9 | Stunning Skyline View|The Wrigley',
        description: `The perfect urban escape, near Chicago’s West Loop, with plenty of options for dining, shopping and entertainment . Featuring a private balcony with skyline views, this contemporary style gem will give you the ultimate luxury living experience.`,
        price: 295
      },
      {
        ownerId: 2,
        address: '546 Freedom Lane',
        city: 'Lake Ozark',
        state: 'Missouri',
        country: 'United States',
        lat: 38.14,
        lng: -92.81,
        name: 'Ozarks Lakefront Family & Pet Friendly',
        description: `Perfect for large/multiple families, or group of friends or even just a couple's getaway - have an adventure as big as Lake of the Ozarks when you stay at this stunning 4 bed/3 bath lakefront home with 2 large decks and a private dock.`,
        price: 409
      },
      {
        ownerId: 3,
        address: '1458 Qual Springs Road',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States',
        lat: 33.88,
        lng: -115.90,
        name: 'Zebra Shadow, Joshua Tree',
        description: `Zebra Shadow, Joshua Tree`,
        price: 249
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
