const routerUsers = require('express').Router();

const { aboutUser, logout } = require('../controllers/controllerUser');

routerUsers.get('/me', aboutUser);
routerUsers.get('/logout', logout);


module.exports = routerUsers;
