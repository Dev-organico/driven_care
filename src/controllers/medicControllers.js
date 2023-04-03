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

export default {
  create,
  signIn,
};