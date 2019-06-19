const {Command} = require('discord.js-commando');
const request = require('request-promise');
const Canvas = require('canvas');
const path = require('path');

const filterLevels = ['Off', 'No Role', 'Everyone'];
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];

module.exports = class ImageCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ship',
			group: 'fun',
			memberName: 'ship',
			description: 'Tells you how compatible two users are',
			details: 'Tells you how compatible two users are',
			aliases: ['match'],
			examples: ['ship @user1 @user2', 'ship @user2'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'user1',
					prompt: 'Which user would you like to ship with?',
					type: 'user'
				},
				{
					key: 'user2',
					prompt: 'Which user would you like to ship the first with?',
					type: 'user',
					default: msg => msg.author
				},
			]
		});
	}

	async run(msg, { user1, user2 }) {

		//Note: Need to save matches between users eventually.
		var shipNum = Math.floor(Math.random() * 100) + 1;

		var reaction;
		//Determine what to say
		if(shipNum >= 85) { reaction = "You two are such a power couple!"; }
		else if(shipNum < 85 && shipNum >= 65) { reaction = "So cute together!"; }
		else if(shipNum < 65 && shipNum >= 40) { reaction = "You can make it work!"; }
		else if(shipNum < 40) { reaction = "Yikes."; }

		//If you ship with yourself
		if(user1 == user2) {
			shipNum = 150;
			reaction = "You should always love yourself :)";
		}

		// Set a new canvas to the dimensions of 700x300 pixels
		const canvas = Canvas.createCanvas(700, 300);
		const ctx = canvas.getContext('2d');
        
		//Load avatars
		const avatar1 = await Canvas.loadImage(user1.displayAvatarURL);
		const avatar2 = await Canvas.loadImage(user2.displayAvatarURL);

		//Draw avatars
		ctx.drawImage(avatar1, 0, 0, 300, 300);
		ctx.drawImage(avatar2, 400, 0, 300, 300);

		//Draw heart
		const heart = await Canvas.loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'ship-heart.png'));
		ctx.drawImage(heart, 250, 50, 200, 200);

		//Draw percentage
		ctx.font = 'bold 60px sans-serif';
		ctx.textAlign = "center"; 
		ctx.fillStyle = '#ffffff';
		ctx.fillText(shipNum + '%', canvas.width / 2, 150);
    

		//Display
		return msg.say(reaction, { files: [{ attachment: canvas.toBuffer(), name: 'ship.png' }] });
	}
};