import joi from "joi";

export const patientSchemma = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required()
});