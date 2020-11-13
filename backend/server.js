require("dotenv").config();

const database = require("./src/config/db.config.js")
const express = require("express");
const cors = require("cors");
// const routes = require("./src/config/routes.js");

const app = express();

database.connect();

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
// app.use(routes);

app.listen(3001)