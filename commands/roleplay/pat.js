const {Command} = require('discord.js-commando');
const path = require('path');

const patImages = 8;

module.exports = class patCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pat',
			group: 'roleplay',
			memberName: 'pat',
			description: 'Pats a user',
			details: 'Pats a user',
			examples: ['pat @user1'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'victim',
					label: "victim",
					prompt: 'Which user would you like to pat?',
					type: 'user'
				},
			]
		});
	}

	async run(msg, { victim }) {

		let patSelection = Math.floor(Math.random()*patImages);
		if (patSelection == 0) patSelection +=1;
		
        
		let reaction = msg.author + " pats themselves(?)";
		if(victim != msg.author) {
			reaction = msg.author + " pats " + victim + " :)";
		}

		//Display
		return msg.say(reaction, { files: [{ attachment: path.join(__dirname, '..', '..', 'assets', 'images', 'pats', 'pat' + patSelection + '.gif'), name: 'pat.gif' }] });
	}
};