import { Router } from "express";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import patientControllers from "../controllers/patientControllers.js";
import { patientSchemma } from "../schemas/patientSchema.js";

const patientRoutes = Router();

patientRoutes.post('/signup', validateSchema(patientSchemma) , patientControllers.create)
patientRoutes.post("/signin", patientControllers.signIn)

export default patientRoutes;