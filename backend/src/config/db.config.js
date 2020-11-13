require('dotenv').config();
const sequelize = require('sequelize');

module.exports = {
	async connect() {
		try {
			const dbconn = new sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
				host: process.env.DB_HOST,
				dialect: 'mysql'
			});
			await dbconn.authenticate();
			console.log('Connection has been established successfully.');
		} catch (error) {
			console.log('Unable to connect to the database:', error);
		}
	}
}
