import { Router } from "express";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import medicControllers from "../controllers/medicControllers.js";
import { medicSchemma } from "../schemas/medicSchema.js";


const medicRoutes = Router();

medicRoutes.post('/signup', validateSchema(medicSchemma) , medicControllers.create)
medicRoutes.post("/signin", medicControllers.signIn)

export default medicRoutes;