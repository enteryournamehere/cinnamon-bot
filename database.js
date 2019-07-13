const Sequelize = require('sequelize');

class CinnamonDatabase {
	constructor() {
		this.db = new Sequelize(process.env.dbName, process.env.dbUsername, process.env.dbPassword, {
			dialect: 'mysql',
			port: 3306,
			host: process.env.CLEARDB_DATABASE_HOST,
			provider: 'mysql',
			logging: false,
		});
	}

	async start(shardID) {
		await this.db.authenticate();
		this.db.sync()
			.then(() => console.log(`[Shard ${shardID}] Connected to database!`))
			.catch((err) => console.log(err));
	}
}

module.exports = new CinnamonDatabase();