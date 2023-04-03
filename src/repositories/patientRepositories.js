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

  export default {
    findByEmail,
    create,
    findById
  };