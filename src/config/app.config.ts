import * as Joi from '@hapi/joi';

export const appConfigValidationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'docker')
    .default('development')
    .required(),
  PORT: Joi.number().positive().required().default(8080),
  POSTGRES_PORT: Joi.number().positive().required().default(5432),
  POSTGRES_HOST: Joi.string().alphanum().required(),
  POSTGRES_USER: Joi.string().alphanum().required(),
  POSTGRES_PASSWORD: Joi.string().alphanum().required().min(4).max(15),
  POSTGRES_DATABASE: Joi.string().alphanum().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_REFRESH_KEY: Joi.string().required(),
});
