const routerUsers = require('express').Router();

const { aboutUser } = require('../controllers/controllerUser');

routerUsers.get('/me', aboutUser);


module.exports = routerUsers;
