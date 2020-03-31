const { Joi } = require('celebrate');

const celebrateSignin = {
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/),
    password: Joi.string().required().min(6),
  }),
};

const celebrateSignup = {
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
};

const celebratePostArticle = {
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(10),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/),
    image: Joi.string().required().regex(/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/),
  }),
};

const celebrateDelArticle = {
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
};


module.exports = {
  celebrateSignin, celebrateSignup, celebratePostArticle, celebrateDelArticle,
};
