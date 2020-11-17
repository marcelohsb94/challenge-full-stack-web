const Student = require('../models/Student');
const { Op } = require('sequelize');

module.exports = {
	async getAll(request, response) {
		const { search } = request.query;

		if (search) {
			await Student.findAll({
				attributes: ['ra', 'name', 'email'],
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
						},
						{
							cpf: {
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
				return response.json({ error: error.message });
			});
		}
		else {
			await Student.findAll({
				attributes: ['ra', 'name', 'email']
			})
			.then(function(students) {
				return response.json(students);
			})
			.catch(function(error) {
				return response.json({ error: error.message });
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
			return response.json({ error: error.message });
		})
	},

	async create(request, response) {
		const { name, email, ra, cpf } = request.body;

		await Student.create({ name, email, ra, cpf })
		.then(function(student) {
			return response.json({ success: 'Aluno cadastrado com sucesso', id: student.id });
		})
		.catch(function(error) {
			return response.json({ error: error.message })
		});
	},

	async update(request, response) {
		const { name, email } = request.body;
		const { id } = request.params;

		await Student.update(
			{ name, email },
			{
				where: { id }
			}
		)
		.then(function() {
			return response.json({ success: 'Aluno atualizado com sucesso!' })
		})
		.catch(function(error) {
			return response.json({ error: error.message })
		});
	},

	async delete(request, response) {
		const { id } = request.params;

		await Student.destroy({
			where: { id }
		})
		.then(function() {
			return response.json({ success: 'Aluno removido com sucesso!' });
		})
		.catch(function(error) {
			response.json({ error: error})
		});
	}
}