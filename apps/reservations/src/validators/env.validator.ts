import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  AUTH_HOST: Joi.string().required(),
  AUTH_TCP_PORT: Joi.number().required(),
});
