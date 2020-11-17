const User = require('../models/User');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
	async signIn(request, response) {
		const { email, password } = request.body;

		await User.findOne({ email })
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
						return response.json(token);
					}
					return response.json({ error: 'Senha inválida' });
				} else {
					return response.json({ error: 'Usuário não encontrado' })
				}
			})
			.catch(function(err) {
				return response.json({ error: err.message });
			})
	},

	async get(request, response) {
		const { search } = request.query;

		if (search) {
			await User.findAll({
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
				return response.json(error);
			});
		} else {
			await User.findAll()
			.then(function(users) {
				return response.json(users);
			})
			.catch(function(error) {
				return response.json(error);
			});
		}
	},

	async getOne(request, response) {
		const { id } = request.params
		await User.findAll({
			where: { id }
		})
		.then(function(user) {
			return response.json(user)
		})
		.catch(function(error){
			return response.json(error);
		})
	},

	async create(request, response) {
		const { name, email, ra, cpf } = request.body;

		await User.create({ name, email, ra, cpf })
		.then(function() {
			return response.json(user);
		})
		.catch(function(error) {
			return response.json(error)
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
			return response.json(user)
		})
		.catch(function(error) {
			return response.json(error)
		});
	},

	async delete(request, response) {
		const { id } = request.params.id;

		await User.destroy({
			where: { id: id }
		})
		.then(function() {
			return response.json(true);
		})
		.catch(function(error) {
			response.json({ error: error})
		});


	}
}