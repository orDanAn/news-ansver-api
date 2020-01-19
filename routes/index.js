const router = require('express').Router();

const { celebrate } = require('celebrate');

const { createUser, signin } = require('../controllers/controllerUser');

const auth = require('../middlewares/auth');

const routerUsers = require('./routerUser');

const routerArticle = require('./routerArticle');

const NotFoundError = require('../errors/not_found_error');

const { messegNotFoundError } = require('../variables/variables');
const { apiLimiter } = require('../config/rateLimiter/rateLimiter');
const { celebrateSignin, celebrateSignup } = require('../config/celebrate/celebrate');

router.use(apiLimiter);

router.post('/signin', celebrate(celebrateSignin), signin);

router.post('/signup', celebrate(celebrateSignup), createUser);

router.use(auth);

router.use('/articles', routerArticle);
router.use('/users', routerUsers);

router.use('*', () => {
  throw new NotFoundError(messegNotFoundError);
});

module.exports = router;
