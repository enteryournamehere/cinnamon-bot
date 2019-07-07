const {Command} = require('discord.js-commando');
const path = require('path');

const cryImages = 9;

module.exports = class cryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cry',
			group: 'roleplay',
			memberName: 'cry',
			description: 'Cries',
			details: 'Cries',
			examples: ['cry'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
		});
	}

	async run(msg, { victim }) {

        const crySelection = Math.floor(Math.random()*cryImages);
        if (crySelection == 0) crySelection +=1;
		let reaction = msg.author + " cries :(";

		//Display
		return msg.say(reaction, { files: [{ attachment: path.join(__dirname, '..', '..', 'assets', 'images', 'cries', 'cry' + crySelection + '.gif'), name: 'cry.gif' }] });
	}
};