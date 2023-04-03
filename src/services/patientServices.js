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

  const token = jwt.sign({ userId: patient.id , type:"patient" }, process.env.SECRET_JWT)

  return token;
}

export default {
  create,
  signIn,
};