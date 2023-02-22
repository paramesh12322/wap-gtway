import GroupParticipants from "../models/groupParticipants.js";

class GroupParticipantsDB {
    constructor(){
        this.groupParticipants = GroupParticipants
    }

    async createGroupParticipants(session_name, group_id,participants_number,isAdmin) {
		await this.groupParticipants.create({ session_name, group_id,participants_number,isAdmin });
	}

    async findOneGroupParticipantsDB(session_name,group_id,participants_number) {
		const sesi = await this.groupParticipants.findOne({ where: { session_name,group_id ,participants_number} });
		if (sesi) {
			return sesi;
		} else {
			return false;
		}
	}

}
export default GroupParticipantsDB;