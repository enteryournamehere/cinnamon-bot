const {Command} = require('discord.js-commando');

const path = require('path');

module.exports = class ShipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'coinflip',
			group: 'fun',
			memberName: 'coinflip',
			description: 'Flips a coin!',
			details: 'Flips a coin!',
			examples: ['coinflip'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
		});
	}

	async run(msg, { victim }) {
		const num = Math.round(Math.random());
		let reaction = "You got heads!"
		if(num == 1) {
			reaction = "You got tails!"
			return msg.say(reaction,{ files: [path.join(__dirname, '..', '..', 'assets', 'images', 'tails.png')] });
		}
		return msg.say(reaction,{ files: [path.join(__dirname, '..', '..', 'assets', 'images', 'heads.png')] });
		
	}
};