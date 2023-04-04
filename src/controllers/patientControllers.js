import patientServices from "../services/patientServices.js";


async function create(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await patientServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signIn({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function getMedics(req, res, next) {
  const name = req.query.name ?? ''
  const specialty = req.query.specialty ?? ''
  const address = req.query.adress ?? ''

  const { type } = res.locals.user

  
  try {
    const medics = await patientServices.getMedics({ name, specialty, address, type });
    return res.send({ medics });
  } catch (err) {
    next(err);
  }
}

async function createAppointment(req, res, next) {
  
  const { medic_id, date, start_time } = req.body
  const { userId, type } = res.locals.user
  
  
  try {
    await patientServices.createAppointment({ userId, medic_id, date, start_time, type });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }

}

async function getAllApointments(req, res, next) {

  const { userId, type } = res.locals.user

  try {
    const appointments = await patientServices.getAllApointments({ userId, type });
    return res.send({appointments}).status(200);
  } catch (err) {
    next(err);
  }

}

async function getFinishedAppointments(req, res, next) {

  const { userId, type } = res.locals.user

  try {
    const appointments = await medicServices.getFinishedAppointments({ userId, type });
    return res.send({ appointments });
  } catch (err) {
    next(err);
  }
}




export default {
  create,
  signIn,
  getMedics,
  createAppointment,
  getAllApointments,
  getFinishedAppointments
};