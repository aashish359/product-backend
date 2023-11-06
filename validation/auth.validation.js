const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

const registerSchema = loginSchema

module.exports = {
  loginSchema,
  registerSchema
}
