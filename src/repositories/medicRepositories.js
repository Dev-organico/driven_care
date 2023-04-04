import connectionDb from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(
    `    
    SELECT * FROM medics WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password, specialty, address }) {
  return await connectionDb.query(
    `
        INSERT INTO medics (name, email, password, specialty, address)
        VALUES ($1, $2, $3, $4, $5)
    `,
    [name, email, password, specialty, address]
  );
}

async function findById(id) {
    return await connectionDb.query(
      `    
      SELECT * FROM medics WHERE id=$1
    `,
      [id]
    );
  }

  async function getAllappointments(userId){
    return await connectionDb.query(
      `    
      SELECT * FROM appointments 
      WHERE medic_id = $1
      AND confirmed = 'false'
      AND cancelled = 'false'
    `,
      [userId]
    );
  }

  async function confirmAppointments({ userId , id}){
    return await connectionDb.query(
      `    
      UPDATE appointments
      SET confirmed = true
      WHERE 
      medic_id = $1
      AND
      id = $2
    `,
      [userId,id]
    );
  }

  async function cancelAppointments({ userId , id}){
    return await connectionDb.query(
      `    
      UPDATE appointments
      SET cancelled = true
      WHERE 
      medic_id = $1
      AND 
      id = $2
    `,
      [userId,id]
    );
  }


  async function getFinishedAppointments(userId){
    return await connectionDb.query(
      `    
      SELECT * FROM appointments 
      WHERE medic_id = $1
      AND (confirmed = 'true' || cancelled = 'true')
    `,
      [userId]
    );
  }



  export default {
    findByEmail,
    create,
    findById,
    getAllappointments,
    confirmAppointments,
    cancelAppointments,
    getFinishedAppointments
  };