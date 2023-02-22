import GroupUser from "../models/groupUser.model.js";
import GroupParticipants from "../models/groupParticipants.js";

class GroupUserDB {
    constructor(){
        this.groupUser = GroupUser
		this.groupParticipantss = GroupParticipants
    }

    async createGroupUser(session_name, member_id,group_name,isCommunity,groupParticipants) {
	const createdGroupUser = await this.groupUser.create({ session_name, member_id,group_name,isCommunity });
	const group_id = createdGroupUser.group_id
	for(let i=0;i<groupParticipants.length;i++){
		const participants_number = groupParticipants[i].id
		const isAdmin = groupParticipants[i].admin !== null ? groupParticipants[i].admin : null
		await this.groupParticipantss.create({session_name,group_id,participants_number,isAdmin})
	}
	}

    async findOneGroupDB(session_name,member_id) {
		const sesi = await this.groupUser.findOne({ where: { session_name ,member_id} });
		if (sesi) {
			return sesi;
		} else {
			return false;
		}
	}

}
export default GroupUserDB;