'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [{
			name: 'Administrador',
			email: 'email@email.com',
			password: '$2a$10$g9PaAEUT8LWuWopHIEoScejBqMwU1Evo5P0b/bIrq/K3Ulq03asyC',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
	}
};
