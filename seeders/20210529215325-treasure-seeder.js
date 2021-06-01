'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('treasures', [

      {
        id: 100,
        Latitude: 1.33125924,
        Longitude: 103.89804864,
        Name: "T1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 101,
        Latitude: 1.32255754,
        Longitude: 103.89430855,
        Name: "T2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        Latitude: 1.3166356,
        Longitude: 103.88912254,
        Name: "T3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
        Latitude: 1.31286055,
        Longitude: 103.85455645,
        Name: "T4",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        Latitude: 1.34439896,
        Longitude: 103.87659381,
        Name: "T5",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        Latitude: 1.33616189,
        Longitude: 103.87708662,
        Name: "T6",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 106,
        Latitude: 1.32552844,
        Longitude: 103.86910143,
        Name: "T7",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 107,
        Latitude: 1.32303589,
        Longitude: 103.87748154,
        Name: "T8",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 108,
        Latitude: 1.33465304,
        Longitude: 103.87748154,
        Name: "T9",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 109,
        Latitude: 1.32606138,
        Longitude: 103.87930069,
        Name: "T10",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 110,
        Latitude: 1.25886946,
        Longitude: 103.89887904,
        Name: "T11",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 111,
        Latitude: 1.26973345,
        Longitude: 103.8810448,
        Name: "T12",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 112,
        Latitude: 1.32914713,
        Longitude: 103.8334781,
        Name: "T13",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 113,
        Latitude: 1.32960595,
        Longitude: 103.88079366,
        Name: "T14",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 114,
        Latitude: 1.33700251,
        Longitude: 103.84922492,
        Name: "T15",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 115,
        Latitude: 1.27845714,
        Longitude: 103.85717615,
        Name: "T16",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 116,
        Latitude: 1.36019784,
        Longitude: 103.85635821,
        Name: "T17",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 117,
        Latitude: 1.31551921,
        Longitude: 103.8632839,
        Name: "T18",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('treasures', null, {})
  }
};
