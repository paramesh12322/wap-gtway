import { DataTypes } from "sequelize";
import { sequelize } from "../../config/Database.js";
import IndividualMessage from "./individualMessage.model.js";


const IndividualUser = sequelize.define('individual_users', {
  individual_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  session_name: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  member_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  individual_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'individual_users',
});
  IndividualUser.removeAttribute("id");
  IndividualUser.hasMany(IndividualMessage, { foreignKey: "individual_id" });
  IndividualMessage.belongsTo(IndividualUser, { foreignKey: "individual_id" });
export default IndividualUser;
