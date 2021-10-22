const yup = require('yup');
const parse = require('date-fns/parse');
const format = require('date-fns/format');

module.exports.parseDate = (req, res, next) => {
  const { body } = req;

  try {
    body.timeValue = parse(body.timeValue, 'dd.MM.yyyy', new Date());
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateMessage = async (req, res, next) => {
  const { body } = req;

  const MESSAGE_VALIDATION_SCHEMA = yup.object().shape({
    text: yup
      .string()
      .trim()
      .min(1)
      .max(100, 'Не больше 100 символов')
      .required('Введите сообщение'),
    email: yup
      .string()
      .email('например: name@gmail.com')
      .required('Введите email'),
    timeValue: yup
      .date()
      .min(new Date(2020, 12, 31), 'Неверная дата')
      .max(new Date(), 'Неверная дата')
      .required('Введите дату')
  });

  try {
    const validatedMessage = await MESSAGE_VALIDATION_SCHEMA.validate(body);
    req.body = validatedMessage;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.formatDate = (req, res, next) => {
  try {
    req.body.timeValue = format(req.body.timeValue, 'dd.MM.yyyy');
    next();
  } catch (error) {
    next(error);
  }
};
