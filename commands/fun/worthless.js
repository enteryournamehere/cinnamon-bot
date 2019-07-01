const {Command} = require('discord.js-commando');
const Canvas = require('canvas');
const path = require('path');

module.exports = class ShipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'worthless',
			group: 'fun',
			memberName: 'worthless',
			description: 'Tells you a user is worthless.',
			details: 'Tells you a user is worthless.',
			examples: ['worthless @user1', 'worthless [url]', 'worthless (with attached image)'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10
			},
			args: [
				{
					key: 'victim',
					label: "victim",
					prompt: 'Which user would you like to call worthless?',
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
		ctx.drawImage(avatar, 200, 75, 300, 300);

        
		//Load and draw overlay
		const heart = await Canvas.loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'worthless.png'));
		ctx.drawImage(heart, 0, 0, canvas.width, canvas.height);

		let reaction = "I don't think you're worthless, " + msg.author + "!";
		if(victim != msg.author) {
			reaction = msg.author + " thinks you're worthless, " + victim + ", you just gonna take that?";
		}

		//Display
		return msg.say(reaction,{ files: [{ attachment: canvas.toBuffer(), name: 'worthless.png' }] });
	}
};