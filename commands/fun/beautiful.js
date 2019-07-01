const {Command} = require('discord.js-commando');
const Canvas = require('canvas');
const path = require('path');

module.exports = class ShipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'beautiful',
			group: 'fun',
			memberName: 'beautiful',
			description: 'Tells you a user is beautiful.',
			details: 'Tells you a user is beautiful.',
			examples: ['beautiful @user1', 'beautiful [url]', 'beautiful (with attached image)'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'victim',
					label: "victim",
					prompt: 'Which user would you like to call beautiful?',
					type: 'user'
				},
			]
		});
	}

	async run(msg, { victim }) {

	

		// Set a new canvas to the dimensions of 700x300 pixels
		const canvas = Canvas.createCanvas(720, 806);
		const ctx = canvas.getContext('2d');
        
		//Set white background
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.fill();
        
		//Load avatars
		const avatar = await Canvas.loadImage(victim.displayAvatarURL);

		//Draw avatars
		ctx.drawImage(avatar, 475, 50, 200, 200);
		ctx.drawImage(avatar, 475, 460, 200, 200);

        
		//Load and draw overlay
		const heart = await Canvas.loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'beautiful.png'));
		ctx.drawImage(heart, 0, 0, canvas.width, canvas.height);

		//Display
		return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'beautiful.png' }] });
	}
};