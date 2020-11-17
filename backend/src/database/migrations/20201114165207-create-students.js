'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('students', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true
			},
			ra: {
				type: Sequelize.STRING(9),
				allowNull: false,
				unique: true
			},
			cpf: {
				type: Sequelize.CHAR(11),
				allowNull: false,
				unique: true
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('students');
	}
};
