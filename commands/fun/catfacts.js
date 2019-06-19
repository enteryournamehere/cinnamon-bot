const {Command} = require('discord.js-commando');
const request = require('request-promise');
var catFacts = [
    "No cat has ever been convicted of murder.",
    "A large cat can weigh as much as two smaller cats combined.",
    "Cats and humans do not have the same number of bones.",
    "Cats can retract into their shells to avoid danger.",
    "All cats are required by law to learn a musical instrument during adolescence.",
    "It is physically impossible for a cat to lift a car.",
    "Cats can only land on their feet if they've prepared a decent financial safety net.",
    "Cats sweat through their paws.",
    "A group of cats is called a 'clowder'",
    "Cat purring can heal their bones.",
    "Cats cannot taste sweetness.",
    "Cats only meow to imitate toddler cries.",
    "Cats cannot tell a lie.",
    "Cats are not fans of roller coasters.",
    "Cats don't use Discord very often.",
    "Cats never divorce one another. Or cheat on one another with other cats. Or take the kids. Please, Karen. I miss them so much."
]

module.exports = class CatCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'catfact',
			group: 'fun',
			memberName: 'cat fact',
			description: 'Gives you a 100% legitimate cat fact.',
			details: 'Gives you a 100% legitimate cat fact.',
			aliases: ['cf'],
			examples: ['catfact', 'cf'],
            guildOnly: true,
            throttling: {
				usages: 2,
				duration: 10
			},
		});
    }
    
    async run(msg) {
        return msg.say('Cat fact: ' + catFacts[Math.floor(Math.random()*catFacts.length)]);
    }
}