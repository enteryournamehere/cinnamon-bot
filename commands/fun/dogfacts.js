const {Command} = require('discord.js-commando');
const request = require('request-promise');
var dogFacts = [
    "It takes two dogs to safely operate a machine press.",
    "Sometimes it's okay to be sad.",
    "My dog ruined my favorite pillow.",
    "The Eiffel Tower is several dogs tall, at least.",
    "No dog has ever won an Olympic gold medal.",
    "Dog fur is genetically identical to human teeth.",
    "The tallest dog in the world lives in Brussels.",
    "Dog eggs can lie dormant for up to two years waiting for the right hatching conditions.",
    "The main character of Homer's Iliad was originally a dog named 'Porky.'",
    "Dogs wag their tails.",
    "Dogs poop facing the North-South magnetic axis.",
    "Dogs have a non-negative IQ on average.",
    "Dogs sometimes use four legs to run",
    "Dogs are terrible at calculus.",
    "If you get stood up on a date, try hanging out with your dog. They can tell when you're sad and know just what to do to cheer you up :)"
]

module.exports = class DogCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'dogfact',
			group: 'fun',
			memberName: 'dog fact',
			description: 'Gives you a 100% legitimate dog fact.',
			details: 'Gives you a 100% legitimate dog fact.',
			aliases: ['df'],
			examples: ['dogfact', 'df'],
            guildOnly: true,
            throttling: {
				usages: 2,
				duration: 10
			},
		});
    }
    
    async run(msg) {
        return msg.say('Dog fact: ' + dogFacts[Math.floor(Math.random()*dogFacts.length)]);
    }
}