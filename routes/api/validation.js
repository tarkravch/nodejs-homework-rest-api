const joi = require("joi");

const joiContactSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: joi
    .string()
    .pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/)
    .required(),
});

module.exports = joiContactSchema;
