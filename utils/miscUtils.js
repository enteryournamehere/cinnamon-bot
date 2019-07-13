//Thanks to dragonfire535
module.exports = class Util {

	//Shorten text to 2000 characters
	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	//Format numbers for display
	static formatNumber(number) {
		return Number.parseFloat(number).toLocaleString(undefined, { maximumFractionDigits: 2 });
	}


}