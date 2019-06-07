const secure = require('./secure.json');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');

const Cinnamon = new Commando.Client({
	owner: '147604925612818432',
	commandPrefix: '!',
	unknownCommandResponse: false,
	disableEveryone: true,
});

Cinnamon.registry
	.registerGroups([
		['core', 'Core commands'],
		['some', 'Some group'],
		['other', 'Some other group'],
	])
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
a
Cinnamon.on('ready', () => {
	console.log('lets do it');
});


Cinnamon.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then((settingsProvider) => new Commando.SQLiteProvider(settingsProvider))
).catch(console.error);

Cinnamon.login(secure.discordAPIKey);
