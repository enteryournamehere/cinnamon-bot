const {Command} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'uwuify',
			group: 'fun',
			memberName: 'uwuify',
			description: 'uwuifies a message.',
			details: 'uwuifies a message.',
			aliases: ['uwu'],
			examples: ['uwuify [message]', 'uwu [message'],
			format: '[query]',
			ownerOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'input',
					prompt: 'Message to uwuify',
					type: 'string'
				},
			]
		});
	}

	async run(msg, { input }) {
		input = input.replace(/r/g, "w");
		input = input.replace(/s/g,"sh");
		input = input.replace(/l/g,"w");
		input = input.replace(/th/g, "d");
		input = input.replace(/you/g, "u");
		input.lower;
		input += " uwu";
		return msg.say(input);
	}
};