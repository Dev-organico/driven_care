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

export default {
  create,
  signIn,
};