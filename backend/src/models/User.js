const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING(80),
			email: DataTypes.STRING(100),
			password: DataTypes.CHAR(60, true)
		}, {
			sequelize: connection
		})
	}
}

module.exports = User;