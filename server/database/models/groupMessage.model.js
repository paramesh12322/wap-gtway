import { DataTypes } from "sequelize";
import { sequelize } from "../../config/Database.js";


const GroupMessage = sequelize.define('group_messages', {
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
    group_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'group_users',
        key: 'group_id'
      }
    },
      message_id: {
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
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    modified_by: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
  }, {
    tableName: 'group_messages',
    updatedAt: 'modified_date',
    createdAt: 'created_date',
    hooks: {
      beforeValidate: function (instance, options) {
        if (!options.userId)
          return sequelize.Promise.reject("Session expired. Please login again");
        let userId = functions.decrypt(options.userId);
        instance['created_by'] = userId;
        instance['modified_by'] = userId;
      }
    }
  });
export default GroupMessage;
