const {Command} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'utility',
			memberName: 'say',
			description: '(OWNER ONLY) Sends a message to a channel id',
			details: '(OWNER ONLY) Sends a message to a channel id',
			examples: ['say 469339600196993025 what up'],
			format: '[query]',
			ownerOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'channelID',
					prompt: 'Channel ID to send the message in',
					type: 'string'
				},
				{
					key: 'channelmsg',
					prompt: 'Message to send',
					type: 'string'
				},
			]
		});
	}

	async run(msg, { channelID, channelmsg }) {
		return this.client.channels.get(channelID).send(channelmsg);
	}
};