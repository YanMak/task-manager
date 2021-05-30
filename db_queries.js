const Pool = require('pg').Pool;
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'mytestdb',
    password: 'ktulhuverner545',
    port: 5432,
};

const pool = new Pool(config);

//const pool = new pg.Pool(config);

async function db_query (q) {
  const client = await pool.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}

const selectDataFromLists = async () => {
    try {
    const { rows } = await db_query('SELECT * FROM lists')
    //console.log(JSON.stringify(rows))
    return rows;
  } catch (err) {
    console.log('Database ' + err)
  }
}

const createListsRecord = async (body) => {
  return new Promise(function(resolve, reject) {
    const { id, name } = body;
    //console.log(`createListsRecord:`);
    //console.log(`${id} ${name}`);
    let query = `INSERT INTO lists (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = ($2) RETURNING *`;
    pool.query(query, [id, name], (error, results) => {
      if (error) {
        reject(error)
      }
      //resolve(`A new list record has been added: ${results.rows[0]}`)
      resolve(results.rows);
    })
  })
}

module.exports = {
    selectDataFromLists,
    createListsRecord
}