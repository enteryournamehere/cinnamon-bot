const {Command} = require('discord.js-commando');
const request = require('request-promise');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = ['Off', 'No Role', 'Everyone'];
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];

module.exports = class ServerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server',
			group: 'utility',
			memberName: 'server',
			description: 'Responds with detailed information on the server.',
			details: 'Responds with detailed information on the server.',
			aliases: ['guild','serverinfo'],
			examples: ['server'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
		});
	}

	async run(msg) {
		if (!msg.guild.members.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
		const embed = new RichEmbed()
			.setColor(0x00AE86)
			.setThumbnail(msg.guild.iconURL)
			.addField('Name', msg.guild.name, true)
			.addField('ID', msg.guild.id, true)
			.addField('Region', msg.guild.region.toUpperCase(), true)
			.addField('Creation Date', moment.utc(msg.guild.createdAt).format('MM/DD/YYYY h:mm A'), true)
			.addField('Explicit Filter', filterLevels[msg.guild.explicitContentFilter], true)
			.addField('Verification Level', verificationLevels[msg.guild.verificationLevel], true)
			.addField('Owner', msg.guild.owner.user.tag, true)
			.addField('Members', msg.guild.memberCount, true)
			.addField('Roles', msg.guild.roles.size, true)
			.addField('Channels', msg.guild.channels.filter(channel => channel.type !== 'category').size, true);
		return msg.embed(embed);
	}
};