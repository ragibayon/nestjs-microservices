import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  TCP_PORT: Joi.number().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
});
