const Sequelize = require('sequelize');
const secure = require('./secure.json');

class CinnamonDatabase {
	constructor() {
		this.db = new Sequelize('heroku_30d135e9e96c9c4', process.env.dbUsername, process.env.dbPassword, {
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