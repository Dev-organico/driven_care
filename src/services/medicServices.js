import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import medicRepositories from "../repositories/medicRepositories.js";

async function create({ name, email, password, specialty, address }) {
  const { rowCount } = await medicRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await medicRepositories.create({ name, email, password: hashPassword, specialty, address });
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

async function getAllappointments({ userId, type }){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
    rows: [appointments],
  } = await medicRepositories.getAllAppointments(userId);
  if (!rowCount) throw errors.notFoundError();

  return appointments

}

async function confirmAppointments({ userId, type , id}){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
  } = await medicRepositories.confirmAppointments({ userId, id});
  if (!rowCount) throw errors.notFoundError();

}

async function cancelAppointments({ userId, type , id}){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
  } = await medicRepositories.cancelAppointments({ userId, id});
  if (!rowCount) throw errors.notFoundError();

}

async function getFinishedAppointments({ userId, type }){

  if (type === 'patient') throw errors.unauthorizedError();

  const {
    rowCount,
    rows: [appointments],
  } = await medicRepositories.getFinishedAppointments(userId);
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