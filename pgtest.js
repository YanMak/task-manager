const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mytestdb',
    password: 'ktulhuverner545',
    port: 5432,
});

client.connect();
console.log(`connected to ${client.database}`);

function createUsersTable() {
const query = `
CREATE TABLE users (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;

//regular
//client.query(query, (err, res) => {
//  if (err) {
//      console.error(err);
//      return;
//  }
//  console.log('Table is successfully created');
 // client.end();
//});

//promises
client
    .query(query)
   .then(res => {
        console.log('Table is successfully created');
   })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });

//try {
//    const res = await client.query(query);
//    console.log('Table is successfully created');
//} catch (err) {
//    console.log(err.stack);
//} finally {
//    client.close();
//}
}

function insertDataToUsers(){
    const query = `
    INSERT INTO users (email, firstName, lastName, age)
    VALUES ('johndoe1@gmail.com', 'john', 'doe', 21)
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    });

}

function SelectDataFromUsers(){
    const query = `
    SELECT *
    FROM users
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data select successful');
        for (let row of res.rows) {
            console.log(row);
        }
        client.end();
    });

}

function UpdateDataToUsers(){
    const query = `
    UPDATE users
    SET age = 22
    WHERE email = 'johndoe@gmail.com'
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data update successful');
        for (let row of res.rows) {
            console.log(row);
        }
        client.end();
    });

}

function deleteFromUsers(){
    const query = `
    DELETE FROM users
    WHERE email = 'johndoe@gmail.com'
    `; 

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data delete successful');
        for (let row of res.rows) {
            console.log(row);
        }
        client.end();
    });
}



insertDataToUsers();
//SelectDataFromUsers();
//UpdateDataToUsers();
//deleteFromUsers();