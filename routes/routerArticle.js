const routerArticle = require('express').Router();

const { celebrate } = require('celebrate');

const { getArticles, postArticle, deleteArticle } = require('../controllers/controllerArticle');

const { celebratePostArticle, celebrateDelArticle } = require('../config/celebrate/celebrate');


routerArticle.get('/', getArticles);

routerArticle.post('/', celebrate(celebratePostArticle), postArticle);

routerArticle.delete('/:_id', celebrate(celebrateDelArticle), deleteArticle);


module.exports = routerArticle;
