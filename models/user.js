const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { messegNotPassword } = require('../variables/variables');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    match: [/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});


userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(messegNotPassword));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(messegNotPassword));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
