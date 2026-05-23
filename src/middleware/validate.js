const AppError = require('../utils/AppError');

const validate = (schema, source = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[source], { abortEarly: false, allowUnknown: false });
  if (error) {
    const message = error.details.map((d) => d.message.replace(/"/g, '')).join(', ');
    return next(new AppError(message, 400));
  }
  next();
};

module.exports = validate;
