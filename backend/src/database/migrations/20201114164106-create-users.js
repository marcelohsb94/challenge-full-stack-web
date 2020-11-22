'use strict';

const { query } = require("express");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(80),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true
			},
			password: {
				type: Sequelize.CHAR(60, true),
				allowNull: false
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
		await queryInterface.dropTable('users');
	}
};
