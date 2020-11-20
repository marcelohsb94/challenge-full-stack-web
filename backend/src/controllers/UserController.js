const User = require('../models/User');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
	async signIn(request, response) {
		const { email, password } = request.body;

		await User.findOne({ where: { email }})
			.then(function(user) {
				if (user) {
					if (bcrypt.compare(password, user.password)) {
						const token = jwt.sign(
							{
								id: user.id,
								email: user.email,
								nome: user.nome
							},
							process.env.SECRET,
							{expiresIn: 28800}
						);
						return response.json({ token });
					}
					return response.json({ error: 'Senha inválida' });
				} else {
					return response.json({ error: 'Usuário não encontrado' })
				}
			})
			.catch(function(error) {
				return response.json({ error: error.message });
			});
	},

	async getAll(request, response) {
		const { search } = request.query;

		if (search) {
			await User.findAll({
				attributes: ['name', 'email'],
				where: {
					[Op.or]: [
						{
							name: {
								[Op.like]: '%'+search+'%'
							}
						},
						{
							email: {
								[Op.like]: '%'+search+'%'
							}
						}
					]
				}
			})
			.then(function(users) {
				return response.json(users)
			})
			.catch(function(error) {
				return response.json({ error: error.message });
			});
		} else {
			await User.findAll({
				attributes: ['name', 'email']
			})
			.then(function(users) {
				return response.json(users);
			})
			.catch(function(error) {
				return response.json({ error: error.message });
			});
		}
	},

	async getOne(request, response) {
		const { id } = request.params
		await User.findOne({
			attributes: ['name', 'email'],
			where: { id }
		})
		.then(function(user) {
			return response.json(user)
		})
		.catch(function(error){
			return response.json({ error: error.message });
		});
	},

	async create(request, response) {
		const { name, email, password } = request.body;

		await User.create({ name, email, password })
		.then(function(user) {
			delete user.dataValues.password;

			return response.json(user);
		})
		.catch(function(error) {
			return response.json({ error: error.message })
		});
	},

	async update(request, response) {
		const { name, password } = request.body;
		const { id } = request.params;

		await User.update(
			{ name, password },
			{
				where: { id }
			}
		)
		.then(function(user) {
			delete user.dataValues.password;

			return response.json(user)
		})
		.catch(function(error) {
			return response.json({ error: error.message })
		});
	},

	async delete(request, response) {
		const { id } = request.params;

		await User.destroy({
			where: { id }
		})
		.then(function() {
			return response.json(true);
		})
		.catch(function(error) {
			response.json({ error: error.message })
		});


	}
}