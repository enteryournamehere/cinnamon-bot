const secure = require('./secure.json');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const fs = require('fs');

const Cinnamon = new Commando.Client({
	owner: ['87723984799399936','147604925612818432'],
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
    
Cinnamon.on('ready', () => {
    console.log('NOTE: Bot successfully started.');
    Cinnamon.user.setActivity('Testing!');
});

if(fs.existsSync('settings.sqlite3')) {
    Cinnamon.setProvider(
        sqlite.open(path.join(__dirname, 'settings.sqlite3')).then((settingsProvider) => new Commando.SQLiteProvider(settingsProvider))
    ).catch(console.error);
}
else {
    console.error('ERROR: File settings.sqlite3 does not exist.');
}

Cinnamon.login(process.env.BOT_TOKEN);