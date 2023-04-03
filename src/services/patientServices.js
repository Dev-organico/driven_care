import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import patientRepositories from "../repositories/patientRepositories.js";


async function create({ name, email, password }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({ name, email, password: hashPassword });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [patient],
  } = await patientRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, patient.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: patient.id, type: "patient" }, process.env.SECRET_JWT)

  return token;
}

async function getMedics({ name, specialty, address, type }) {

  if (type === 'medic') throw errors.unauthorizedError();

  const {
    rowCount,
    rows: [medics],
  } = await patientRepositories.getMedics({ name, specialty, address });
  if (!rowCount) throw errors.notFoundError();

  return medics

}

async function createAppointment({userId, medic_id, date, start_time, type }) {

  if (type === 'medic')throw errors.unauthorizedError();
  
  const { rowCount } = await patientRepositories.findByDate({date, start_time})
  if (rowCount) throw errors.conflictError("This date/hour is not available")
  
  await patientRepositories.createAppointment({ userId, medic_id, date, start_time });

  

}

async function getAllApointments({ userId, type }){

  if (type === 'medic')throw errors.unauthorizedError();
  
  const {
    rowCount,
    rows: [appointments],
  } = await patientRepositories.getAllAppointments(userId);
  if (!rowCount) throw errors.notFoundError();

  return appointments

}

async function getFinishedAppointments({ userId, type }){

  if (type === 'medic') throw errors.unauthorizedError();
 
  const {
    rowCount,
    rows: [appointments],
  } = await patientRepositories.getFinishedAppointments(userId);
  if (!rowCount) throw errors.notFoundError();

  return appointments

}



export default {
  create,
  signIn,
  getMedics,
  createAppointment,
  getAllApointments,
  getFinishedAppointments
};