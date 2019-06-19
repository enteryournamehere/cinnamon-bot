const {Command} = require('discord.js-commando');
const request = require('request-promise');
const { RichEmbed } = require('discord.js');
const { shorten, formatNumber } = require('../utility/miscUtils');


//dragonfire535's Xiao modified to use request-promise and new urbandictionary API system.
module.exports = class ImageCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urbandictionary',
			group: 'search',
			memberName: 'urbandictionary',
			description: 'Finds a definition on Urban Dictionary',
			details: 'Finds a definition on Urban Dictionary',
			aliases: ['ud'],
			examples: ['ud yeet'],
			format: '[query]',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'word',
					prompt: 'What would you like to search for?',
					type: 'string',
				},
			],
		});
    }

	async run(msg, { word }) {
		try {
			const body = await request({
                uri: ('http://api.urbandictionary.com/v0/define'),
                qs: {term: word},
                json: true
            });
			if (!body.list.length) return msg.say('Could not find any results.');
			const data = body.list[0];
			const embed = new RichEmbed()
				.setColor(0x32A8F0)
				.setAuthor('Urban Dictionary', 'https://i.imgur.com/Fo0nRTe.png', 'https://www.urbandictionary.com/')
				.setURL(data.permalink)
				.setTitle(data.word)
				.setDescription(shorten(data.definition.replace(/\[|\]/g, '')))
				.setFooter(`👍 ${formatNumber(data.thumbs_up)} 👎 ${formatNumber(data.thumbs_down)}`)
				.setTimestamp(new Date(data.written_on))
				.addField('Example', data.example ? shorten(data.example.replace(/\[|\]/g, ''), 1000) : 'None');
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};