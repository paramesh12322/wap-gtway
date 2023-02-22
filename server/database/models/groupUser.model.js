import { DataTypes } from "sequelize";
import { sequelize } from "../../config/Database.js";
import GroupMessage from "./groupMessage.model.js";
import GroupParticipants from "./groupParticipants.js";


const GroupUser = sequelize.define('group_users', {
  group_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  session_name: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  isCommunity: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  member_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  }, {
    tableName: 'group_users',
  });
  GroupUser.removeAttribute("id");
  GroupUser.hasMany(GroupMessage, { foreignKey: "group_id" });
  GroupUser.hasMany(GroupParticipants, { foreignKey: "group_id" });
  GroupMessage.belongsTo(GroupUser, { foreignKey: "group_id" });
  GroupParticipants.belongsTo(GroupUser, { foreignKey: "group_id" });
export default GroupUser;
