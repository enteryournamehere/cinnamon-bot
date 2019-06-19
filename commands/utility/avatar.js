const {Command} = require('discord.js-commando');
const request = require('request-promise');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			group: 'utility',
			memberName: 'avatar',
			description: 'Displays avatar of a user',
			details: 'Displays avatar of a user',
			examples: ['avatar @inco', 'avatar [user]'],
			format: '[query]',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to get the avatar of?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	async run(msg, { user }) {
		const formats = ['webp', 'png', 'jpg'];
		const format = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
		if (format === 'gif') formats.push('gif');
		return msg.say({embed: {
			title: `Avatar for ${user.tag}`,
			description: formats.map(fmt => `[${fmt.toUpperCase()}](${user.displayAvatarURL})`).join(' - '),
			color: 0x00AE86,
			image: {
				url: user.displayAvatarURL,
			},
		}});
	}
};