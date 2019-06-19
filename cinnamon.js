const Commando = require('discord.js-commando');
const path = require('path');
//Version number for playing status
var versionNum = 'v0.0.1';

const Cinnamon = new Commando.Client({
	owner: ['87723984799399936', '147604925612818432'],
	commandPrefix: 'c!',
	unknownCommandResponse: false,
	disableEveryone: true,
});

// eslint-disable-next-line no-global-assign
console = new (require('./utils/advancedConsole'))(0, console.log);

Cinnamon.registry
	.registerGroups([
		['search', 'Search commands'],
		['fun', 'Fun commands'],
		['utility', 'Utility commands']
	])
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

Cinnamon.on('ready', () => {
	console.log('Bot successfully started.');
	//Set custom status for local testing
	if(!process.env.BOT_TOKEN) Cinnamon.user.setActivity('Testing!');
	//Main status
	else Cinnamon.user.setActivity(Cinnamon.commandPrefix + 'help | ' + versionNum);
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
