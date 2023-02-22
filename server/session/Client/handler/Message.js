import GroupParticipantsDB from "../../../database/db/groupParticipants.js";
import GroupUserDB from "../../../database/db/groupUsers.js";
import IndividualMessageDB from "../../../database/db/individualMessage.js";
import IndividualUserDB from "../../../database/db/individualUsers.js";
import { AutoReply, ButtonResponse, ListResponse } from "../../../database/db/messageRespon.db.js";
import SessionDatabase from "../../../database/db/session.db.js";
import Client from "./Client.js";
import Serialize from "./Serialize.js";

export default class Message extends Serialize {
	constructor(client, msg, session_name) {
		super();
		this.session = session_name;
		this.client = client;
		this.msg = msg.messages;
		this.type = msg.type;
	}
	async mainHandler() {
		const individualUserDB = new IndividualUserDB()
		const sessionDB = new SessionDatabase()
		const groupUserDB = new GroupUserDB()
		const individualMessageDB = new IndividualMessageDB()
		const groupParticipantsDB = new GroupParticipantsDB()
		var current_session = ''
		var identifyMe = false
		try {
			if (!this.msg) return;
			const message = this.msg[0];
			if (message.key && message.key.remoteJid === "status@broadcast") return;
			if (!message.message) return;
			const m = await this.serial(this.client, message);

			const bot = new Client(this.client, m.from);

			const sessionFound = await sessionDB.findAllSessionDB()
			const botNumber = m.botNumber.replace(/^([\d]+)@s.whatsapp.net$/, '$1');

			for(let i=0;i<sessionFound.length;i++){
				if(sessionFound[i].session_number === botNumber){
					current_session = sessionFound[i].session_name
				}
			}
			if(m.isGroupMsg === true){
				const checkGroupUser = await groupUserDB.findOneGroupDB(current_session,m.msg.key.remoteJid)
				if(checkGroupUser === false){
					await groupUserDB.createGroupUser(current_session,m.msg.key.remoteJid,m.group.groupMetadata.subject,m.group.groupMetadata.announce,m.group.groupMetadata.participants)
				}else{
					var array_participants = m.group.groupMetadata.participants
					var group_id = checkGroupUser.group_id
					for(let i=0;i<array_participants.length;i++){
						var part_id = array_participants[i].id
						var isAdmin = array_participants[i].admin !== null ? array_participants[i].admin : null
				    	const found_group_participant =	await groupParticipantsDB.findOneGroupParticipantsDB(current_session,group_id,part_id)
						if(found_group_participant === false){
							await groupParticipantsDB.createGroupParticipants(current_session,group_id,part_id,isAdmin)
						}
					}
				}

			}else if(m.isGroupMsg === false){
				const checkIndividualUser = await individualUserDB.findOneIndividualDB(current_session,m.msg.key.remoteJid)
				if(checkIndividualUser === false && m.fromMe === false){
					await individualUserDB.createIndividualUser(current_session,m.msg.key.remoteJid,m.msg.pushName)
				}else if(m.fromMe === true && identifyMe === false && checkIndividualUser === false){
					await individualUserDB.createIndividualUser(current_session,m.msg.key.remoteJid,m.msg.pushName)
					identifyMe = true
				}else{
					const findIndividualUser = await individualUserDB.findOneIndividualDB(current_session,m.msg.key.remoteJid)
					const res_individual_id = findIndividualUser.individual_id
					if(res_individual_id){
						if(m.body){
							await individualMessageDB.createIndividualMessage(current_session,res_individual_id,m.msg.key.id,m.from,m.sender,m.body)
						}
					}
				}
				
			}

			const CMD = m.command ? m.command : null;
			if (!CMD) return this.messageHandler(m, bot);
		} catch (error) {
			console.log(error);
		}
	}

	async messageHandler(m, bot) {
		const buttonResponse = new ButtonResponse();
		const listResponse = new ListResponse();
		const replyResponse = new AutoReply();

		const keywordReply = await replyResponse.checkMessageUser(m.botNumber, m.body);
		const keywordButton = await buttonResponse.checkKeyword(m.body, m.from);
		const keywordList = await listResponse.checkKeyword(m.body, m.from);

		if (keywordButton) {
			await bot.reply(keywordButton.response, m.msg);
			return await buttonResponse.deleteKeyword(keywordButton.msg_id, keywordButton.keyword);
		} else if (keywordList) {
			await bot.reply(keywordList.response, m.msg);
		} else if (keywordReply) {
			await bot.reply(keywordReply.response, m.msg);
		}
		if (m.body == "Bot") {
			return bot.reply(`Yes Sir..`, m.msg);
		} else if (m.body == "Test") {
			await bot.reply("why test", m.msg);
		}
	}
}
