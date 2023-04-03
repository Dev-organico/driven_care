import httpStatus from "http-status";
import medicServices from "../services/medicServices.js";


async function create(req, res, next) {
  const { name, email, password, specialty, adress } = req.body;
  try {
    await medicServices.create({ name, email, password, specialty, adress });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await medicServices.signIn({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function getAllappointments(req, res, next) {

  const { medic_id, type } = res.locals.user

  try {
    const appointments = await medicServices.getAllappointments({ medic_id, type });
    return res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

async function confirmAppointments(req, res, next) {

  const { id } = req.params

  const { medic_id, type } = res.locals.user

  try {
    await medicServices.confirmAppointments({ medic_id, type , id});
    return res.sendStatus(204)
  } catch (err) {
    next(err);
  }
}

async function cancelAppointments(req, res, next) {

  const {id } = req.params

  const { medic_id, type } = res.locals.user

  try {
    await medicServices.cancelAppointments({ medic_id, type , id});
    return res.sendStatus(204)
  } catch (err) {
    next(err);
  }
}

async function getFinishedAppointments(req, res, next) {

  const { medic_id, type } = res.locals.user

  try {
    const appointments = await medicServices.getFinishedAppointments({ medic_id, type });
    return res.send({ appointments });
  } catch (err) {
    next(err);
  }
}


export default {
  create,
  signIn,
  getAllappointments,
  confirmAppointments,
  cancelAppointments,
  getFinishedAppointments
};