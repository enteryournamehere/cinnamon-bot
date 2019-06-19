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

		//const ids = [user1.id, user2.id].sort().join(String(Date.now()).substring(0, 5));
		//let shipNum = parseInt(require('crypto').createHash('sha256').update(ids).digest('base64').substring(0, 4), 32) % 101;
		let shipNum = Math.floor(Math.random() * 100) + 1;
		//Determine what to say
		let reaction = "Yikes.";
		if(shipNum >= 40) reaction = "You can make it work!";
		if(shipNum >= 65) reaction = "So cute together!";
		if(shipNum >= 85) reaction = "You two are such a power couple!";

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