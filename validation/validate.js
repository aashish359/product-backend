const Joi = require('joi');
const { schema } = require('../database/db-models/users');

const validate = {
  body: (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ success: false, message });
    }

    req.body = value;
    return next();
  }
}

module.exports = validate;