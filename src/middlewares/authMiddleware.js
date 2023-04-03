import errors from "../errors/index.js";
import patientRepositories from "../repositories/patientRepositories.js";
import jwt from "jsonwebtoken";

async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) throw errors.unauthorizedError();

    const parts = authorization.split(" ");
    if (parts.length !== 2) throw errors.unauthorizedError();

    const [schema, token] = parts;
    if (schema !== "Bearer") throw errors.unauthorizedError();

    let user = undefined;

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        try {
            if (error) throw errors.unauthorizedError();

            if (decoded.type === "patient") {
                const {
                    rows: [patient],
                } = await patientRepositories.findById(decoded.userId);
                if (!patient) throw errors.unauthorizedError();
                user = patient
            }
            else if (decoded.type === "medic") {
                const {
                    rows: [medic],
                } = await medicRepositories.findById(decoded.userId);
                if (!medic) throw errors.unauthorizedError();
                user = medic
            }




            res.locals.user = user;

            next();
        } catch (err) {
            next(err);
        }
    });
}

export default { authValidation };