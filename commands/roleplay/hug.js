const {Command} = require('discord.js-commando');
const path = require('path');

const hugImages = 12;

module.exports = class hugCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'roleplay',
			memberName: 'hug',
			description: 'Hugs a user',
			details: 'Hugs a user',
			examples: ['hug @user1'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'victim',
					label: "victim",
					prompt: 'Which user would you like to hug?',
					type: 'user'
				},
			]
		});
	}

	async run(msg, { victim }) {

		const hugSelection = Math.floor(Math.random()*hugImages);

		
        
		let reaction = "I'll give you a hug, " + msg.author + "!";
		if(victim != msg.author) {
			reaction = msg.author + " hugs " + victim + " :)";
		}

		//Display
		return msg.say(reaction, { files: [{ attachment: path.join(__dirname, '..', '..', 'assets', 'images', 'hugs', 'hug' + hugSelection + '.gif'), name: 'hug.gif' }] });
	}
};