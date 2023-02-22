import { DataTypes } from "sequelize";
import { sequelize } from "../../config/Database.js";
import GroupMessage from "./groupMessage.model.js";
import GroupParticipants from "./groupParticipants.js";
import GroupUser from "./groupUser.model.js";
import History from "./history.model.js";
import IndividualMessage from "./individualMessage.model.js";
import IndividualUser from "./individualUsers.model.js";


const Session = sequelize.define(
	"Session",
	{
		session_name: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
			allowNull: false,
		},
		session_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: "sessions", timestamps: true }
);

Session.removeAttribute("id");

Session.hasMany(History, { foreignKey: "session_name" });
Session.hasMany(IndividualUser, { foreignKey: "session_name" });
Session.hasMany(GroupUser, { foreignKey: "session_name" });
Session.hasMany(IndividualMessage, { foreignKey: "session_name" });
Session.hasMany(GroupMessage, { foreignKey: "session_name" });
Session.hasMany(GroupParticipants, { foreignKey: "session_name" });
History.belongsTo(Session, { foreignKey: "session_name" });
IndividualUser.belongsTo(Session, { foreignKey: "session_name" });
GroupUser.belongsTo(Session, { foreignKey: "session_name" });
IndividualMessage.belongsTo(Session, { foreignKey: "session_name" });
GroupMessage.belongsTo(Session, { foreignKey: "session_name" });
GroupParticipants.belongsTo(Session, { foreignKey: "session_name" });
export default Session;
