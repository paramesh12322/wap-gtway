import IndividualUser from "../models/individualUsers.model.js";

class IndividualUserDB {
    constructor(){
        this.individualUser = IndividualUser
    }

    async createIndividualUser(session_name, member_id,individual_name) {
		await this.individualUser.create({ session_name, member_id,individual_name });
	}

    async findOneIndividualDB(session_name,member_id) {
		const sesi = await this.individualUser.findOne({ where: { session_name ,member_id} });
		if (sesi) {
			return sesi;
		} else {
			return false;
		}
	}

}
export default IndividualUserDB;