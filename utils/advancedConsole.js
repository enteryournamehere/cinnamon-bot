class advancedConsole {
	constructor(shardID, oldLog) {
		this.id = shardID;
		this.oldLog = oldLog
	}
	
	log() {
		let print = "";
		for (const str of arguments) {
			print += str;
		}
		this.oldLog(`${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()} [INFO ] [Shard ${this.id}] ` + print);
	}

	error() {
		let print = "";
		for (const str of arguments) {
			print += str;
		}
		this.oldLog(`${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()} [ERROR] [Shard ${this.id}] ` + print);
	}
}

module.exports = advancedConsole;
