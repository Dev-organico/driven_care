import connectionDb from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(
    `    
    SELECT * FROM patients WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password }) {
  await connectionDb.query(
    `
        INSERT INTO patients (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `    
      SELECT * FROM patients WHERE id=$1
    `,
    [id]
  );
}

async function getMedics({ name, specialty, address }) {
  return await connectionDb.query(`
      SELECT 
      m.name,
      m.specialty,
      m.address
      FROM medics m
      WHERE 
      (m.name ILIKE $1 || '%')
      AND (m.specialty ILIKE $2 || '%')
      AND (m.address ILIKE $3 || '%')
    `, [name, specialty, address]);
}

async function findByDate({ date, start_time }) {
  return await connectionDb.query(`
      SELECT * FROM appointments 
      WHERE 
      date = $1
      AND
      start_time = $2
    `, [date, start_time]);
}

async function createAppointment({ userId, medic_id, date, start_time }) {
  await connectionDb.query(
    `
          INSERT INTO appointments (patient_id, medic_id, date, start_time)
          VALUES ($1, $2, $3, $4)
      `,
    [userId, medic_id, date, start_time]
  );
}

async function getAllAppointments(userId) {
  return await connectionDb.query(
    `
      SELECT
      m.name as medic_name,
      a.date, 
      a.start_time
      FROM appointments a
      JOIN medics m ON a.medic_id = m.id
      WHERE patient_id = $1
      AND confirmed = false
      AND cancelled = false
      `,
    [userId]
  );
}

async function getFinishedAppointments(userId) {
  return await connectionDb.query(
    `    
      SELECT
      m.name as medic_name,
      a.date, 
      a.start_time
      FROM appointments a
      JOIN medics m ON a.medic_id = m.id
      WHERE patient_id = $1
      AND confirmed = true
      OR cancelled = true
    `,
    [userId]
  );
}




export default {
  findByEmail,
  create,
  findById,
  getMedics,
  findByDate,
  createAppointment,
  getAllAppointments,
  getFinishedAppointments
};