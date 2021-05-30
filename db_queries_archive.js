const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mytestdb',
    password: 'ktulhuverner545',
    port: 5432,
});

//const pool = new pg.Pool(config);

client.connect();
console.log(`connected to ${client.database}`);

const createListsTable = async () => {
    const query = `
    CREATE TABLE lists (
    id varchar UNIQUE,
    name varchar(250)
    );`
    ;

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
}

const dropBoardsTable = async () => {
    const query = `
    DROP TABLE boards;`
    ;

    client
    .query(query)
   .then(res => {
        console.log('Table is successfully dropped');
   })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
}

const dropListsTable = async () =>{
    const query = `
    DROP TABLE lists;`
    ;

    client
    .query(query)
   .then(res => {
        console.log('Table is successfully dropped');
   })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
}

const dropTasksTable = async () => {
    const query = `
    DROP TABLE tasks;`
    ;

    client
    .query(query)
   .then(res => {
        console.log('Table is successfully dropped');
   })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
}

const createBoardsTable = async () => {
    //{ name: 'Инсити 2021', id: '5c8a10ac6cfffa56dc044d1c' }
    const query = `
    CREATE TABLE boards (
    id varchar UNIQUE,
    name varchar(250)
    );`
    ;

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

}

const createTasksTable = async () => {
    //{ name: 'Инсити 2021', id: '5c8a10ac6cfffa56dc044d1c' }
    const query = `
    CREATE TABLE tasks (
    id varchar UNIQUE,
    name varchar(250),
    list_id varchar,
    task_on_list_order integer
    );`
    ;

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

}

const selectDataFromBoards = async () => {
    const query = `
    SELECT *
    FROM boards
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log('Data select successful');
        //for (let row of res.rows) {
        //    console.log(row);
        //}
        client.end();
        return res.rows;
    });

}

const selectDataFromLists = async () => {
    const query = `
    SELECT *
    FROM lists
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log('Data select successful');
        //for (let row of res.rows) {
        //    console.log(row);
        //}
        client.end();
        return res.rows;
    });

}

const a_selectDataFromTasks = async () => {
    const query = `
    SELECT *
    FROM tasks
    `;

    client.query(query, (err, res) => {
        if (err) {
            //console.error(err);
            return;
        }
        //console.log('Data select successful');
        //for (let row of res.rows) {
        //    console.log(row);
        //}
        client.end();
        return res.rows;
    });
}  

const selectDataFromTasks = async () => {
    const query = `
    SELECT *
    FROM tasks
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
        return res.rows;
    });

}

const clearDataFromBoardsTable = async () =>{
    const query = `
    DELETE FROM boards
    `; 

    //client.connect();
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data delete successful');
        //for (let row of res.rows) {
        //    console.log(row);
        //}
        //client.end();
    });

}

const clearDataFromTasksTable = async () =>{
    const query = `
    DELETE FROM tasks
    `; 

    //client.connect();
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data delete successful');
        //for (let row of res.rows) {
        //    console.log(row);
        //}
        //client.end();
    });

}

function archive_insertDataToBoards(id, name){
    const query = `
    INSERT INTO boards (id, name)
    VALUES ('johndoe1@gmail.com', 'john')
    `;

    console.log('Data insert prepare');
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    });

}

//function insertDataToBoards(id, name){
//    const query = `INSERT INTO boards (id, name) VALUES ($1, $2) RETURNING *`;
//
//    console.log('Data insert prepare');
//    client.query(query, [id, name], (err, res) => {
//        if (err) {
//            console.error(err);
//            return;
//        }
//        console.log('Data insert successful');
//        client.end();
//    });
//
//}

const createBoardsRecord = async (body) => {
  return new Promise(function(resolve, reject) {
    const { id, name } = body;
    //console.log(`createBoardRecord:`);
    //console.log(`${id} ${name}`);
    let query = ``;
    query = `INSERT INTO boards (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = ($2) RETURNING *`;
    //query = `INSERT INTO boards (id, name) VALUES ($1, $2) RETURNING * `;
    client.query(query, [id, name], (error, results) => {
      if (error) {
        reject(error)
      }
      //console.log(results.rows);
      resolve(`A new board record has been added: ${results.rows[0]}`)
    })
  })
}

const createListsRecord = async (body) => {
  return new Promise(function(resolve, reject) {
    const { id, name } = body;
    console.log(`createListsRecord:`);
    console.log(`${id} ${name}`);
    let query = `INSERT INTO lists (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = ($2) RETURNING *`;
    client.query(query, [id, name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new list record has been added: ${results.rows[0]}`)
    })
  })
}

const createTasksRecord = async (body) => {
  return new Promise(function(resolve, reject) {
    let { id, name, list_id = '', task_on_list_order = 0, tratata = 555 } = body;
    //console.log(`createListsRecord:`);
    //console.log(typeof(task_on_list_order));
    
    //console.log(`id:${id} --- name:${name} --- list_id:${list_id} ---task_on_list_order:${task_on_list_order}---tratata${tratata} `);
    //{id: element.id, name:element.name, list_id: element.list_id, task_on_list_order:element.task_on_list_order}
    //return;
    //onsole.log(`1 task_on_list_order:${task_on_list_order}---`);
    if (typeof(task_on_list_order) != typeof(123)) {
        task_on_list_order = 0;        
    }
    //console.log(`2 task_on_list_order:${task_on_list_order}---`);
    //console.log(`id:${id} --- name:${name} --- list_id:${list_id} ---task_on_list_order:${task_on_list_order}---tratata${tratata} `);

    let query = `INSERT INTO tasks (id, name, list_id, task_on_list_order) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET name = ($2), list_id = ($3),task_on_list_order=($4)  RETURNING *`;
    client.query(query, [id, name, list_id, task_on_list_order], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new list record has been added: ${results.rows[0]}`)
    })
  })
}

//const updateListsRecord = async (body) => {
//  return new Promise(function(resolve, reject) {
//    const { id, name } = body;
//    console.log(`createListsRecord:`);
//    console.log(`${id} ${name}`);
//    client.query(`UPDATE lists SET name = ($2) WHERE id = ($1) RETURNING *`, [id, name], (error, results) => {
//      if (error) {
//        reject(error)
//      }
//      resolve(`A new list record has been added: ${results.rows[0]}`)
//    })
//  })
//}

module.exports = {
createListsTable,
createBoardsTable,
createTasksTable,
dropBoardsTable,
dropListsTable,
dropTasksTable,
clearDataFromBoardsTable,
clearDataFromTasksTable,
selectDataFromBoards,
selectDataFromLists,
selectDataFromTasks,
createBoardsRecord,
createListsRecord,
createTasksRecord,
a_selectDataFromTasks
}