import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import medicRepositories from "../repositories/medicRepositories.js";

async function create({ name, email, password, specialty, adress }) {
  const { rowCount } = await medicRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await medicRepositories.create({ name, email, password: hashPassword, specialty, adress });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [medic],
  } = await medicRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, medic.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: medic.id , type:"medic" }, process.env.SECRET_JWT)

  return token;
}

async function getAllappointments({ medic_id, type }){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
    rows: [appointments],
  } = await medicRepositories.getAllAppointments(medic_id);
  if (!rowCount) throw errors.notFoundError();

  return appointments

}

async function confirmAppointments({ medic_id, type , id}){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
  } = await medicRepositories.confirmAppointments({ medic_id, id});
  if (!rowCount) throw errors.notFoundError();

}

async function cancelAppointments({ medic_id, type , id}){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
  } = await medicRepositories.cancelAppointments({ medic_id, id});
  if (!rowCount) throw errors.notFoundError();

}

async function getFinishedAppointments({ medic_id, type }){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
    rows: [appointments],
  } = await medicRepositories.getFinishedAppointments(medic_id);
  if (!rowCount) throw errors.notFoundError();

  return appointments

}



export default {
  create,
  signIn,
  getAllappointments,
  confirmAppointments,
  cancelAppointments,
  getFinishedAppointments
};