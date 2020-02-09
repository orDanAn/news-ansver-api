const messegForbidden = 'это статья не Ваша, её нельзя удалить';
const messegNotFoundErrorID = 'не правильно указан ID';
const messegNotFoundError = 'Запрашиваемый ресурс не найден';
const messegUnauthorized = 'Необходима авторизация!!!';
const messegNotPassword = 'Неправильные почта или пароль';
const messegErrorServer = 'На сервере произошла ошибка';
const messegNotContainID = 'карточки с таким id нет в базе';
const allowedCors = ['localhost:3000', 'https://ordanan.github.io/news-ansver-frontend', 'http://localhost:8080'];

module.exports = {
  messegForbidden,
  messegNotFoundErrorID,
  messegUnauthorized,
  messegNotFoundError,
  messegNotPassword,
  messegErrorServer,
  messegNotContainID,
  allowedCors,
};
