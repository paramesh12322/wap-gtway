import { DataTypes } from "sequelize";
import { sequelize } from "../../config/Database.js";
import GroupMessage from "./groupMessage.model.js";


const GroupParticipants = sequelize.define('group_participants', {
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
      participants_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
  }, {
    tableName: 'group_participants',
  });
  GroupParticipants.removeAttribute("id");
export default GroupParticipants;
