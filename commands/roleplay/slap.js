const {Command} = require('discord.js-commando');
const path = require('path');

const slapImages = 16;

module.exports = class slapCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slap',
			group: 'roleplay',
			memberName: 'slap',
			description: 'Slaps a user',
			details: 'Slaps a user',
			examples: ['slap @user1'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'victim',
					label: "victim",
					prompt: 'Which user would you like to slap?',
					type: 'user'
				},
			]
		});
	}

	async run(msg, { victim }) {

		const slapSelection = Math.floor(Math.random()*slapImages.length);

		
        
		let reaction = msg.author + " slaps themselves!";
		if(victim != msg.author) {
			reaction = msg.author + " slaps " + victim + " :O";
		}

		//Display
		return msg.say(reaction, { files: [{ attachment: path.join(__dirname, '..', '..', 'assets', 'images', 'slaps', 'slap' + slapSelection + '.gif'), name: 'slap.gif' }] });
	}
};