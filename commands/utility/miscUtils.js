module.exports = class Util {
  
	//Thanks to dragonfire535 for shorten util and urbandictionary help
	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	static formatNumber(number) {
		return Number.parseFloat(number).toLocaleString(undefined, { maximumFractionDigits: 2 });
	}
}