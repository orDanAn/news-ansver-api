const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const rateLimit = require('express-rate-limit');

const { createUser, signin } = require('../controllers/controllerUser');

const auth = require('../middlewares/auth');

const routerUsers = require('./routerUser');

const routerArticle = require('./routerArticle');

const NotFoundError = require('../errors/not_found_error');

const { messegNotFoundError } = require('../variables/variables');


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

router.post('/signin', apiLimiter, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/),
    password: Joi.string().required().min(6),
  }),
}), signin);

router.post('/signup', apiLimiter, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use(auth);

router.use('/articles', routerArticle);
router.use('/users', routerUsers);

router.use('*', () => {
  throw new NotFoundError(messegNotFoundError);
});

module.exports = router;
