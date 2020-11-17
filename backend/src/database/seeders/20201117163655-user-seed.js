'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [{
			name: 'Administrador',
			email: 'email@email.com',
			password: '$2y$10$DYPVWMCwcGybid7QdExTF.FQ5lEmZqzSu.2O62bdm0fe.0VrH79ni',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
	}
};
