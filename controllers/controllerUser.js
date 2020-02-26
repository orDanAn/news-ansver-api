const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not_found_error');
const Unauthorized = require('../errors/unauthorized_error');

const { NODE_ENV, JWT_SECRET } = process.env;
const { jwtSecret } = require('../config/config');
const {
  messegNotFoundErrorID, messegUnauthorized, messagLogout, duplicateUser,
} = require('../variables/variables');

function aboutUser(req, res, next) {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messegNotFoundErrorID);
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch(next);
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(201).send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.message.indexOf('E11000 duplicate key') === 0) {
        throw new Unauthorized(duplicateUser);
      }
    })
    .catch(next);
}

function signin(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtSecret, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        }).json({ message: 'authorized!', token });
    })
    .catch((err) => {
      // ошибка аутентификации
      throw new Unauthorized(err.message);
    })
    .catch(next);
}

function logout(req, res, next) {
  try {
    res.clearCookie('jwt', { path: '/' });
  } catch (e) {
    const err = new Unauthorized(messegUnauthorized);
    next(err);
  }
  return res.status(200).json(messagLogout);
}

module.exports = {
  aboutUser, createUser, signin, logout,
};
