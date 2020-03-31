const Article = require('../models/article');
const NotFoundError = require('../errors/not_found_error');
const Forbidden = require('../errors/forbidden');
const { messegForbidden, messegNotFoundErrorID, messegNotContainID } = require('../variables/variables');

function getArticles(req, res, next) {
  Article.find({ owner: req.user })
    .then((article) => res.send({ article }))
    .catch(next);
}

function postArticle(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ article }))
    .catch(next);
}

function deleteArticle(req, res, next) {
  Article.findById(req.params._id)
    .then((article) => {
      if (!(article.owner.toString() === req.user._id.toString())) {
        throw new Forbidden(messegForbidden);
      }
      Article.findByIdAndRemove(req.params._id)
        .then((articleDel) => {
          if (!articleDel) {
            throw new NotFoundError(messegNotFoundErrorID);
          }
          return res.send({ articleDel });
        });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        throw new NotFoundError(messegNotContainID);
      }
      next(err);
    })
    .catch(next);
}


module.exports = { getArticles, postArticle, deleteArticle };
