import * as Joi from '@hapi/joi';

export const appConfigValidationSchema: Joi.ObjectSchema = Joi.object({
  PORT: Joi.number().positive().required().default(8080),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_REFRESH_KEY: Joi.string().required(),
});
