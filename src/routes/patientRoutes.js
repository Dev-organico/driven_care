import { Router } from "express";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import patientControllers from "../controllers/patientControllers.js";
import { patientSchemma } from "../schemas/patientSchema.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {appointmentSchema} from "../schemas/appointmentSchema.js"


const patientRoutes = Router();

patientRoutes.post('/signup', validateSchema(patientSchemma) , patientControllers.create)
patientRoutes.post('/signin', patientControllers.signIn)
patientRoutes.get('/medic/?name&speciality&adress', authMiddleware.authValidation, patientControllers.getMedics)
patientRoutes.post('/appointments', validateSchema(appointmentSchema),authMiddleware.authValidation,patientControllers.createAppointment)
patientRoutes.get('/appointments', authMiddleware.authValidation,patientControllers.getAllApointments)
patientRoutes.get('/finishedappointments', authMiddleware.authValidation,patientControllers.getFinishedAppointments)

export default patientRoutes;