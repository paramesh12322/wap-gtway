import { DataTypes } from "sequelize";
import { sequelize } from "../../config/Database.js";


const IndividualMessage = sequelize.define('individual_messages', {
     id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    session_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    individual_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'individual_users',
        key: 'individual_id'
      }
    },
      message_id: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      from: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      sender: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      message: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      imageMessage: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      videoMessage: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      audioMessage: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      stickerMessage: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      contactMessage: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      locationMessage: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
  }, {
    tableName: 'individual_messages',
  });
export default IndividualMessage;
