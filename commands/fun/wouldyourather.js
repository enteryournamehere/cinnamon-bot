const {Command} = require('discord.js-commando');
const request = require('request-promise');
var wyrQuestions = [
	"lose the ability to read or lose the ability to speak?",
	"have a golden voice or a silver tongue?",
	"be covered in fur or covered in scales?",
	"be in jail for a year or lose a year off your life?",
	"have one real get out of jail free card or a key that opens any door?",
	"know the history of every object you touched or be able to talk to animals?",
	"have all traffic lights you approach be green or never have to stand in line again?",
	"give up all drinks except for water or give up eating anything that was cooked in an oven?",
	"be able to see 10 minutes into your own future or 10 minutes into the future of anyone but yourself?",
	"be an average person in the present or a king of a large country 2500 years ago?",
	"be forced to dance every time you heard music or be forced to sing along to any song you heard?",
	"have all your clothes fit perfectly or have the most comfortable pillow, blankets, and sheets in existence?",
	"5% of the population have telepathy, or 5% of the population have telekinesis? You are not part of the 5% that has telepathy or telekinesis.",
	"only be able to use a fork (no spoon) or only be able to use a spoon (no fork)?",
	"give up social media or eat the same meal for dinner for the rest of your life",
	"lose all of the money you’ve earned this year or lose all of the memories you’ve gained this year?",
	"know the date of your death or the cause of your death?",
	"flip a coin for a chance to win $20 or immediately win $10?",
	"always hit a red light for the rest of your life or always get slow internet after the sun goes down?",
	"go blind or deaf?",
	"be married to someone good-looking who doesn’t think you’re attractive or be married to someone ugly who thinks you’re gorgeous?",
	"wake up in your underwear at work or wake up naked in the woods 20 miles from home?",
	"fight a chicken to the death every time you get into your vehicle or fight an orangutan to the death once a year, but you get a sword?",
	"always be 20 minutes late for an important event or always be 2 hours early to everything else?",
	"eat a live worm or be locked in a room with a tarantula for an hour but not know where the tarantula is?",
	"be 4 years old your entire life or be 90 years old your entire life?",
	"save 3 of your closest family members or 1,000 people you don’t know?",
	"date the hottest person in the world but not be able to have sex with them or date an ugly person that you can have sex with?",
	"have sex with your cousin in secret or not have sex with your cousin but everyone would think you did?",
	"wake up in the middle of a good dream every time and not be able to fall back to sleep or never be able to wake up from a nightmare?",
	"always have tangled hair or always have wet underarms?",
	"give up brushing your teeth or brushing your hair?",
	"be a vegetarian or only be able to eat meat?",
	"have a pause button in your life or a rewind button?",
	"be able to play every single musical instrument or be able to master every type of sport?",
	"have one partner or multiple partners?",
	"accidentally send a dirty text to your boss or a sexy voicemail to your mom?",
	"have finger sized nipples or nipple sized fingers?",
	"eat chocolate flavoured shit or shit-flavoured chocolate?",
	"shit on someone or have someone shit on you?",
	"have sex with a hideously ugly person or a beautiful, fresh corpse?",
	"fart every time you laugh or burp every time you cry?",
	"eat your family pet or kill your parents?",
	"have sex with someone with really bad BO or really bad breath?",
	"cheat and be caught or be cheated on and never be told?",
	"not have sex for two years or have it every day of your life but not orgasm ever?",
	"be constantly itchy or constantly sticky?",
	"have a ten-inch long belly button that swayed to music or accordions for legs?",
	"be born with an elephant trunk or a giraffe neck?",
	"eat poison ivy or a handful of wasps?",
	"be stranded on an island alone or with the person you hate the most?",
	"have vaginas in your armpits or an armpit between your legs?",
	"have a bell go off every time you're horny or never get horny?",
	"drown or burn to death?",
	"fulfil your biggest wish or resolve your biggest regret?",
	"shout all the time or whisper all the time?",
	"never have to pee again or never have to shit again?",
	"eat a whole jar of mayonnaise or a whole tub of butter?",
	"be eaten by maggots from the inside out or ants from the outside in?",
	"meet the love of your life knowing that they'll die in a year or never meet them?",
	"live your life over as the opposite gender or start your life over as a kid again?",
	"die quickly or slowly but not painfully?",
	"paint a wall with your face or your knees?",
	"have a runny nose for the rest of your life or cough after every word?",
	"always forget who you are or always forget who everyone else is?",
]

module.exports = class wyrCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'wouldyourather',
			group: 'fun',
			memberName: 'would you rather',
			description: 'Gives you a "would you rather" question',
			details: 'Gives you a "would you rather" question',
			aliases: ['wyr'],
			examples: ['wyr', 'wouldyourather'],
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 10
			},
		});
	}
	//dogFacts[Math.floor(Math.random()*dogFacts.length)])
	async run(msg) {
		var selection = wyrQuestions[Math.floor(Math.random()*wyrQuestions.length)];
		selection = selection.split(" or ");
		return msg.say('Would you rather \n(🇦) ' + selection[0] + ', or \n(🇧) ' + selection[1]).then(sentEmbed => {
			sentEmbed.react("🇦")
			sentEmbed.react("🇧")
		})
	}
}