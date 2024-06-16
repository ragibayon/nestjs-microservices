import * as Joi from 'joi';
export const envValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  TCP_PORT: Joi.number().required(),
});
