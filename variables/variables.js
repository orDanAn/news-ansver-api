const messegForbidden = 'это статья не Ваша, её нельзя удалить';
const messegNotFoundErrorID = 'не правильно указан ID';
const messegNotFoundError = 'Запрашиваемый ресурс не найден';
const messegUnauthorized = 'Необходима авторизация!!!';
const messegNotPassword = 'Неправильные почта или пароль';
const messegErrorServer = 'На сервере произошла ошибка';
const messegNotContainID = 'карточки с таким id нет в базе';
const messagLogout = 'До скорой встречи';
const duplicateUser = 'такой пользователь уже есть';
const whitelist = ['http://localhost:8080', 'https://www.news-ansver.site', 'http://www.news-ansver.site', 'https://news-ansver.site', 'http://news-ansver.site', 'https://ordanan.github.io'];


module.exports = {
  messegForbidden,
  messegNotFoundErrorID,
  messegUnauthorized,
  messegNotFoundError,
  messegNotPassword,
  messegErrorServer,
  messegNotContainID,
  whitelist,
  messagLogout,
  duplicateUser,
};
