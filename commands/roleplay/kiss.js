const {Command} = require('discord.js-commando');
const path = require('path');

const kissImages = 12;

module.exports = class kissCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'roleplay',
			memberName: 'kiss',
			description: 'Kisses a user',
			details: 'Kisses a user',
			examples: ['kiss @user1'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'victim',
					label: "victim",
					prompt: 'Which user would you like to kiss?',
					type: 'user'
				},
			]
		});
	}

	async run(msg, { victim }) {

		const kissSelection = Math.floor(Math.random()*kissImages);
		if (kissSelection == 0) kissSelection +=1;

		
        
		let reaction = "No homo, " + msg.author + " <3";
		if(victim != msg.author) {
			reaction = msg.author + " kisses " + victim + " :)";
		}

		//Display
		return msg.say(reaction, { files: [{ attachment: path.join(__dirname, '..', '..', 'assets', 'images', 'kisses', 'kiss' + kissSelection + '.gif'), name: 'kiss.gif' }] });
	}
};