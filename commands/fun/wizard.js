const { Command } = require('discord.js-commando');

module.exports = class WizardCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'wizard',
			group: 'fun',
			memberName: 'wizard',
			description: 'A wizard says your words using his special wizard powers.',
			details: 'A wizard says your words using his special wizard powers.',
			aliases: ['wiz', 'lizardwizard', 'lizwiz'],
			examples: ['wizard [message]', 'wiz [message]'],
			format: '[query]',
			ownerOnly: false,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'input',
					prompt: 'What would you like the wizard to say?',
					type: 'string'
				},
			]
		});
	}

	async run(msg, { input }) {
		msg.delete();
		if (input.length > 24) {
			return msg.say(`The wizard inhales–\n*:sparkles: "${input}" :sparkles:*
                            __\\_/\\\\\\___
                            (°͜-°)   :sparkles:
                            /|\\\\／
                            /\\
            
            `);
		}
		return msg.say(`
__\\_/\\\\\\___
(°͜-°):sparkles: *${input}*
/|\\\\／
/\\`).catch(() => msg.say('The wizard deems that phrase unworthy.'));
	}
};
