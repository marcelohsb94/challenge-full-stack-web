require("dotenv").config();

const express = require("express");
const routes = require("./routes");

require('./database/index');
const cors = require("cors");

const app = express();

app.options('*', cors({
	origin: process.env.ALLOWED_FROM
}));

app.use(
	cors({
		origin: process.env.ALLOWED_FROM,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
	})
);
app.use(express.json());
app.use(routes);

app.listen(3001)