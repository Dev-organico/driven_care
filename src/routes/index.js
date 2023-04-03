import { Router } from "express";
import patientRoutes from "./patientRoutes.js";
import medicRoutes from "./medicRoutes.js";
/* import appointmentRoutes from "./appointmentRoutes.js"; */

const routes = Router();

routes.use("/patient", patientRoutes);
routes.use("/medic", medicRoutes);
/* routes.use("/appointment",appointmentRoutes) */

export default routes;