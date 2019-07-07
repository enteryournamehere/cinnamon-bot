const {Command} = require('discord.js-commando');
const path = require('path');

const hugImages = ['hug1.gif', 'hug2.gif', 'hug3.gif']

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

		const hugSelection = hugImages[Math.floor(Math.random()*hugImages.length)];

		
        
		let reaction = "I'll give you a hug, " + msg.author + "!";
		if(victim != msg.author) {
			reaction = msg.author + " hugs " + victim + " :)";
		}

		//Display
		return msg.say(reaction, { files: [{ attachment: path.join(__dirname, '..', '..', 'assets', 'images', 'hugs', hugSelection), name: 'hug.gif' }] });
	}
};