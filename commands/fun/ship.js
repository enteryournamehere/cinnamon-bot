const {Command} = require('discord.js-commando');
const Canvas = require('canvas');
const path = require('path');

module.exports = class ShipCommand extends Command {
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
					label: "lover",
					prompt: 'Which user would you like to ship with?',
					type: 'user'
				},
				{
					key: 'user2',
					label: "second lover",
					prompt: 'Which user would you like to ship the first with?',
					type: 'user',
					default: msg => msg.author
				},
			]
		});
	}

	async run(msg, { user1, user2 }) {

		const ids = [user1.id, user2.id].sort().join(String(Date.now()).substring(0, 5));
		let shipNum = parseInt(require('crypto').createHash('sha256').update(ids).digest('base64').toLowerCase().substring(0, 4), 32) % 101;
		//Determine what to say
		let reaction = "Yikes.";
		if(shipNum >= 40) reaction = "You can make it work!";
		if(shipNum >= 65) reaction = "So cute together!";
		if(shipNum >= 85) reaction = "You two are such a power couple!";
		if(shipNum == 100) reaction = "It was meant to be!";

		//If you ship with yourself
		if(user1 == user2) {
			shipNum = 150;
			reaction = "You should always love yourself :)";
		}

		//If you ship with Cinnamon
		if(user1 == this.client.user || user2 == this.client.user) {
			shipNum = 100;
			reaction = "I'll always love you <3";
		}

		// Set a new canvas to the dimensions of 700x300 pixels
		const canvas = Canvas.createCanvas(750, 300);
		const ctx = canvas.getContext('2d');
        
		//Load avatars
		const avatar1 = await Canvas.loadImage(user1.displayAvatarURL);
		const avatar2 = await Canvas.loadImage(user2.displayAvatarURL);

		//Draw avatars
		ctx.drawImage(avatar1, 20, 20, 300, 300);
		ctx.drawImage(avatar2, 420, 20, 300, 300);

		//Draw heart
		const heart = await Canvas.loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'ship-heart.png'));
		//Change opacity based on ship num
		const heartOpacity = shipNum / 100;
		//Define lower limit to opacity
		if (heartOpacity <= 0.4) { heartOpacity == 0.4;}
		ctx.globalAlpha = heartOpacity;
		//Draw heart and reset opacity
		ctx.drawImage(heart, 270, 80, 200, 200);
		ctx.globalAlpha = 1;

		//If match > 75%, add overlay
		if(shipNum >= 75) {
			const overlay = await Canvas.loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'ship-overlay.png'));
			ctx.drawImage(overlay, 0, 0, 320, 110);
			ctx.drawImage(overlay, 420, 0, 320, 110);
		}

		//Draw percentage
		ctx.font = 'bold 60px sans-serif';
		ctx.textAlign = "center"; 
		ctx.fillStyle = '#ffffff';
		ctx.fillText(shipNum + '%', canvas.width / 2, 180);
    

		//Display
		return msg.say(reaction, { files: [{ attachment: canvas.toBuffer(), name: 'ship.png' }] });
	}
};