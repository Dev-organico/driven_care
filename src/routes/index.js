import { Router } from "express";
import patientRoutes from "./patientRoutes.js";
import medicRoutes from "./medicRoutes.js";


const routes = Router();

routes.use("/patient", patientRoutes);
routes.use("/medic", medicRoutes);


export default routes;