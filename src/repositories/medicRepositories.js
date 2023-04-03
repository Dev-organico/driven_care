import connectionDb from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(
    `    
    SELECT * FROM medics WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password, specialty, adress }) {
  return await connectionDb.query(
    `
        INSERT INTO medics (name, email, password, specialty, adress)
        VALUES ($1, $2, $3, $4, $5)
    `,
    [name, email, password, specialty, adress]
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

  async function getAllappointments(medic_id){
    return await connectionDb.query(
      `    
      SELECT * FROM appointments 
      WHERE medic_id = $1
      AND confirmed = 'false'
      AND cancelled = 'false'
    `,
      [medic_id]
    );
  }

  async function confirmAppointments({ medic_id , id}){
    return await connectionDb.query(
      `    
      UPDATE appointments
      SET confirmed = true
      WHERE 
      medic_id = $1
      AND
      id = $2
    `,
      [medic_id,id]
    );
  }

  async function cancelAppointments({ medic_id , id}){
    return await connectionDb.query(
      `    
      UPDATE appointments
      SET cancelled = true
      WHERE 
      medic_id = $1
      AND 
      id = $2
    `,
      [medic_id,id]
    );
  }


  async function getFinishedAppointments(medic_id){
    return await connectionDb.query(
      `    
      SELECT * FROM appointments 
      WHERE medic_id = $1
      AND (confirmed = 'true' || cancelled = 'true')
    `,
      [medic_id]
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