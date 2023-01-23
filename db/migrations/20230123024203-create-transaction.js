import logger from 'winston';
export default {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Transaction', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        type: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status: {
          type: Sequelize.STRING,
          allowNull: true
        },
        reference: {
          type: Sequelize.STRING,
          allowNull: true
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: true
        },
        receiver: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    } catch (error) {
      logger.error(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.dropTable('Transaction');
    } catch (error) {
      logger.error(error);
    }
  }
};