'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages'
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
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720426520237441315/original/87fcd83e-27a9-4631-89fa-cefea5071c27.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720426520237441315/original/3995dd85-ea71-4eb7-9380-6a4413d109eb.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720426520237441315/original/63a0786e-2587-4d4e-a311-9365740a710e.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720426520237441315/original/4d1a15e4-be8b-4975-9d27-59928c77751c.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720426520237441315/original/c0c3fb6a-4fc5-4aea-8e8e-21d092bf3fe8.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53669775/original/89fe9be9-f035-48f2-9f78-095ad28bbdec.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54078699/original/c4a2ba3f-da40-4b8e-ab45-f08cfa40ea3d.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54078699/original/d84c9ae2-d8bb-43f9-bedb-d599e9122379.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54078699/original/8e96a97a-a84d-4571-a45b-49044208b8db.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54078699/original/65457bd8-df05-4136-98ed-5e63888e18af.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54078699/original/f63462e1-e6f4-4a0a-bf38-87539464e014.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/c29b646e-ddec-4b8e-9034-9786f733dd4c.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/9f927ae2-0c52-4321-bb3d-223252135b72.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/cfb5d1cb-cb3a-4b9a-b40f-bf9538181c47.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/ee38c40a-4c80-4116-a919-174b31809883.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/01f12e45-69c5-4dad-b160-a9770a26a8c8.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53669775/original/4c42970d-97b7-4c06-a8d6-01cdd585815e.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53669775/original/5efcc0a5-0c03-4c82-b515-f57b39a66672.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53669775/original/04471436-b37c-4846-84a4-ea83d871c95c.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53669775/original/2e633eba-b1ed-4242-b14c-6062c48957f3.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/7a3b9e8e-7f89-4710-a476-55f5512513e2.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/d9c71597-1113-4967-8019-381b831ad0c8.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/5ce39250-93c1-4b28-a4dd-844479a8212f.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/16531baa-983d-4051-846b-6a0ca9fba406.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/55821c14-ca2a-46ec-8ca2-167580f4898b.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/b8a5f60d-2bda-4050-bc9e-55af012d6eb4.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/7053c1c6-c63e-4717-9fbf-84c3205a94a8.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/104059941/78fe9aed_original.jpg?',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/8b3d230e-a42e-4d25-b428-ee13d332dc8e.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8167664/original/76436a03-e2a7-454a-ba2c-9b4c021653ac.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/8d1b3385-ab3b-4255-8405-3db97cfe69a0.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/e18c5c47-3b71-49aa-a1de-2c40a147ae8d.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/738e5130-1103-4e15-98e5-c74eb17520f1.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/4ee3d59f-bee4-41fe-a2db-765f1bf99c45.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/048aec0c-3c56-4af5-9ab8-bd153e29649d.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/6838238b-7521-4edb-82ba-fa92e1a4b10c.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/9f42533a-ea55-4a7f-903e-b5b12e19ebdc.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/9f1fef10-0f17-41f1-a009-8678a1854e8e.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/178fd632-1613-4bde-8ce5-641632cc52a4.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/2717a588-03ab-485e-9c55-5b0bae117bb9.jpg',
        preview: false
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
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
      }
    })

  }
};
