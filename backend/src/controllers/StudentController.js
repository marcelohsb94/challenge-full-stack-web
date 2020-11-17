const Student = require('../models/Student');
const { Op } = require('sequelize');

module.exports = {
	async get(request, response) {
		const { search } = request.query;

		if (search) {
			await Student.findAll({
				where: {
					[Op.or]: [
						{
							name: {
								[Op.like]: '%'+search+'%'
							}
						},
						{
							ra: {
								[Op.like]: '%'+search+'%'
							}
						}
					]
				}
			})
			.then(function(students) {
				return response.json(students)
			})
			.catch(function(error) {
				return response.json(error);
			});
		}
		else {
			await Student.findAll()
			.then(function(students) {
				return response.json(students);
			})
			.catch(function(error) {
				return response.json(error);
			});
		}
	},

	async getOne(request, response) {
		const { id } = request.params

		await Student.findByPk({ id })
		.then(function(student) {
			return response.json(student)
		})
		.catch(function(error){
			return response.json(error);
		})
	},

	async create(request, response) {
		const { name, email, ra, cpf } = request.body;

		await Student.create({ name, email, ra, cpf })
		.then(function() {
			return response.json(student);
		})
		.catch(function(error) {
			return response.json(error)
		});
	},

	async update(request, response) {
		const { id, name, email } = request.body;

		await Student.update(
			{ name, email },
			{
				where: {
					id: id
				}
			}
		)
		.then(function(student) {
			return response.json(student)
		})
		.catch(function(error) {
			return response.json(error)
		});
	},

	async delete( request, response ) {
		const { id } = request.params.id;

		await Student.destroy({
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