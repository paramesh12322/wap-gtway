import IndividualMessage from "../models/individualMessage.model.js";

class IndividualMessageDB {
    constructor(){
        this.individualMessage = IndividualMessage
    }

    async createIndividualMessage(session_name,individual_id,message_id,from,sender,message) {
		await this.individualMessage.create({ session_name,individual_id,message_id,from,sender,message });
	}

    async findOnIndividualMessage(session_name,member_id) {
		const sesi = await this.individualMessage.findOne({ where: { session_name ,member_id} });
		if (sesi) {
			return sesi;
		} else {
			return false;
		}
	}

}
export default IndividualMessageDB;