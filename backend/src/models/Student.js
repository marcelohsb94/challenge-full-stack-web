const { Model, DataTypes } = require('sequelize');

class Student extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING(80),
			email: DataTypes.STRING(100),
			ra: DataTypes.STRING(9),
			cpf: DataTypes.CHAR(11)
		}, {
			sequelize: connection
		})
	}
}

module.exports = Student;