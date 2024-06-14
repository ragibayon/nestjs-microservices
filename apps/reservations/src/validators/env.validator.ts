import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
});
