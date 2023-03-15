
import { Sequelize, Model } from 'sequelize';
import uuid from 'uuid/v4';
/**
 * Instalment Model
 *
 * @export
 * @class Instalment
 * @extends {Model}
 */
export default class Transaction extends Model {
  static modelFields = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      validate: {
        isIn: {
          args: [['completed', 'pending', 'failed', 'restructured', 'awaiting-approval', 'cancelled']],
          msg: 'Invalid status. Please provide a valid status.',
        },
      },
    },
    receiver: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      validate: {
        isIn: {
          args: [['normal', 'restructured', 'lateFee', 'restructureFee']],
          msg: 'Invalid type. Please provide a valid type.',
        },
      },
    },
  };
  /**
   * Initializes the Instalment model
   *
   * @static
   * @memberof Transaction
   *
   * @param {any} sequelize the sequelize object
   *
   * @returns {object} the Instalment model
   */
  static init(sequelize) {
    const model = super.init(Transaction.modelFields, { sequelize });
    return model;
  }
}