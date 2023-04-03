import joi from "joi";

export const medicSchemma = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  specialty: joi.string().required(),
  adress: joi.string().required()
});