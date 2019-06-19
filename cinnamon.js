const secure = require('./secure.json');
const Commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');

const Cinnamon = new Commando.Client({
	owner: ['87723984799399936', '147604925612818432'],
	commandPrefix: '-',
	unknownCommandResponse: false,
	disableEveryone: true,
});

// eslint-disable-next-line no-global-assign
console = new (require('./utils/advancedConsole'))(0, console.log);

Cinnamon.registry
	.registerGroups([
		['search', 'Core commands'],
	])
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

Cinnamon.on('ready', () => {
	console.log('Bot successfully started.');
	Cinnamon.user.setActivity('Testing!');
});

// Checks if there's a bot token from Heroku
if (process.env.BOT_TOKEN) Cinnamon.login(process.env.BOT_TOKEN);

// If no bot token, attempts to load from secure.json
else if (fs.existsSync('secure.json')) {
	Cinnamon.login(secure.discordAPIKey);
} else {
	console.error('ERROR: No Heroku environment variables or secure.json found!');
}