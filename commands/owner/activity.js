const {Command} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'activity',
			group: 'owner',
			memberName: 'activity',
			description: '(OWNER ONLY) Changes the bot activity presence',
			details: '(OWNER ONLY) Changes the bot activity presence',
			examples: ['activity yee haw'],
			format: '[query]',
			ownerOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'playing',
					prompt: 'what the bot is playing',
					type: 'string'
				},
				{
					key: 'playType',
					prompt: 'What is the activity type?',
					type: 'string',
					default: "PLAYING"
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, { playing, playType }) {
		this.client.user.setActivity(playing, {type: playType.toUpperCase()});
		return msg.say("Set bot as " + playType + " " + playing);
	}
};