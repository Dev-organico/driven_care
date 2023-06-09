import { Router } from "express";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import medicControllers from "../controllers/medicControllers.js";
import { medicSchemma } from "../schemas/medicSchema.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const medicRoutes = Router();

medicRoutes.post('/signup', validateSchema(medicSchemma) , medicControllers.create)
medicRoutes.post("/signin", medicControllers.signIn)
medicRoutes.get("/appointments", authMiddleware.authValidation, medicControllers.getAllAppointments )
medicRoutes.patch("/confirmappointments/:id", authMiddleware.authValidation, medicControllers.confirmAppointments )
medicRoutes.patch("/cancelappointments/:id", authMiddleware.authValidation,medicControllers.cancelAppointments)
medicRoutes.get("/finishedappointments", authMiddleware.authValidation,medicControllers.getFinishedAppointments )


export default medicRoutes;