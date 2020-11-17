const express = require('express');
const UserController = require('./controllers/UserController');
const StudentController = require('./controllers/StudentController');
const routes = express.Router();
const security = require('./config/auth');

routes.post('/signIn', UserController.signIn);


routes.get('/alunos', security.authorize, StudentController.get);
routes.get('/alunos/:id', security.authorize, StudentController.getOne);
routes.post('/alunos', security.authorize, StudentController.create);
routes.put('/alunos/:id', security.authorize, StudentController.update);
routes.delete('/alunos/:id', security.authorize, StudentController.delete);

routes.get('/usuarios', security.authorize, UserController.get);
routes.get('/usuarios/:id', security.authorize, UserController.getOne);
routes.post('/usuarios', security.authorize, UserController.create);
routes.put('/usuarios/:id', security.authorize, UserController.update);
routes.delete('/usuarios/:id', security.authorize, UserController.delete);

module.exports = routes;
