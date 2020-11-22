require('dotenv').config({path: '../.env'});

const jwt = require('jsonwebtoken');

module.exports = {
	async authorize(request, response, next) {
		const authHeader = request.headers.authorization;
		if (!authHeader) return response.status(401).send({ error: 'No token provided' });

		const parts = authHeader.split(' ');
		if (!parts.length === 2) return response.status(401).send({ error: 'Token error' });

		const [bearer, token] = parts;
		if (!/^Bearer$/i.test(bearer)) return response.status(401).send({ error: 'Malformatted token' });

		jwt.verify(token, process.env.SECRET, function(error, decoded) {
			if (error) return response.status(401).send({error: 'Invalid token'});

			request.userId = decoded.id;
			request.userName = decoded.nome;
			request.userEmail = decoded.email;

			return next();
		})
	}

}