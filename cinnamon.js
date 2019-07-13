//Using sqlite as database
const sqlite = require('sqlite');
const Commando = require('discord.js-commando');
const path = require('path');
const { formatNumber } = require('./utils/miscUtils.js');
// eslint-disable-next-line no-global-assign
console = new (require('./utils/advancedConsole'))(0, console.log);
//Version number for playing status
var versionNum = 'v0.0.1';

const Cinnamon = new Commando.Client({
	owner: ['87723984799399936', '147604925612818432'],
	commandPrefix: 'c!',
	unknownCommandResponse: false,
	disableEveryone: true,
});

//Define looping statuses
const statuses = [Cinnamon.commandPrefix + `help`, `We're gonna be good friends :)`, `:D`, `Try ` + Cinnamon.commandPrefix + `ship`, formatNumber(Cinnamon.guilds.size) + ` servers`, `Hi, I love you`]

require('./database.js').start(Cinnamon.shard.id);
Cinnamon.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

Cinnamon.registry
	.registerGroups([
		['search', 'Search commands'],
		['fun', 'Fun commands'],
		['utility', 'Utility commands'],
		['roleplay', 'Roleplay commands'],
		['owner', 'Owner-only commands']
	])
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

Cinnamon.on('ready', () => {
	console.log('Bot successfully started.');
	//Set custom status for local testing
	if(!process.env.BOT_TOKEN) Cinnamon.user.setActivity('Testing!');
	//Change status every 5 minutes.
	else {
		setInterval(() => {
			const status = statuses[Math.floor(Math.random()*statuses.length)]
			Cinnamon.user.setActivity(status + ' | ' + versionNum);
		}, 300000);
	}
});

//Send hello upon joining server
Cinnamon.on("guildCreate", guild => {
	let channelID;
	const channels = guild.channels;
	//Search for first available text channel
	channelLoop:
	for (const c of channels) {
		const channelType = c[1].type;
		if (channelType === "text") {
			channelID = c[0];
			break channelLoop;
		}
	}
	//Send a hello message
	const channel = Cinnamon.channels.get(guild.systemChannelID || channelID);
	channel.send("Hi! My name is Cinnamon and we're gonna be good friends!\nCheck out my commands with "+Cinnamon.commandPrefix+"help or feel free to dm me :)");
});

// Checks if there's a bot token from Heroku
if (process.env.BOT_TOKEN) Cinnamon.login(process.env.BOT_TOKEN);
// Otherwise, assumes local testing configuration and loads token from secure
else {
	const secure = require('./secure.json');
	Cinnamon.login(secure.discordAPIKey);
}
