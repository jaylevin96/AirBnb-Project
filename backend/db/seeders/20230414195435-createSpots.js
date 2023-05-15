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
      {
        ownerId: 1,
        address: '1458 Frank Sinatra Ave',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 33.88,
        lng: -115.90,
        name: 'Private Room in Elegant French Gothic Home',
        description: `This elegant converted 1925 church rectory in French Gothic style features original stained-glass windows, and one charming guestroom + bath with claw foot tub/shower, chandelier, A/C, and shared kitchen. Enjoy a sunny morning coffee in the garden, a glass of wine, or read by the fire in the living room on chilly nights. `,
        price: 125
      },
      {
        ownerId: 2,
        address: '1307 Central Ave',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'United States',
        lat: 39.88,
        lng: -105.90,
        name: 'Antebellum, Romantic Rococo bedroom',
        description: `Historic Greek Revival,  near the edge of the French Quarter. This beautiful home is dressed out in period style, ornamental plaster, marble fireplaces and antique furnishings. The crowning glory of this property is a gorgeous courtyard.  Lush and private with fountains, ornamental fish pound and hot tub and beautiful gardens.`,
        price: 190
      },
      {
        ownerId: 1,
        address: '1329 Second Ave',
        city: 'San Jose',
        state: 'California',
        country: 'United States',
        lat: 39.88,
        lng: -105.90,
        name: 'Hensley House Private Master room/Bar',
        description: `Welcome to the Hensley House of San Jose.  It gained historical landmark distinction in 1990.  It was the former home of San Jose Mayor Samuel Hensley who was responsible for developing San Jose from a small settlement to a large city in the Mid 1860’s.  This house was originally built in 1894 and still retains it’s old world charms, but updated with modern amenities for your comfort.`,
        price: 93
      },
      {
        ownerId: 2,
        address: '1749 First Street',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        lat: 39.88,
        lng: -105.90,
        name: 'Embrace Tiny Living in a Magical, Bespoke Little Home',
        description: `Warm and inviting, this custom-built 'Tiny One' house offers every home comfort despite its diminutive dimensions. Ingenious design and a thoughtfully considered layout maximizes the space, complete with a snuggly bedroom nook and full-size bathroom.`,
        price: 107
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
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]
      }
    })
  }
};
