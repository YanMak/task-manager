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

const axios = require('axios');
const FormData = require('form-data');
const url = require('url');
const fs = require('fs');
let boards = [];

////////////////////////////////////////
// API. 

// GET_BOARDS
async function get_List_Tree_Data() {

    let payload = { id: '602561331f046837909887a5'};

    const params = new url.URLSearchParams(payload);
    let res;

    const username = '';
    const password = '';
    const usernamePasswordBuffer = Buffer.from(username + ':' + password);
    const base64data = usernamePasswordBuffer.toString('base64');
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64data}`,
        }
    });

    try {
        res = await axiosObject.get(
            'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_list_tree_data'
        );
        return res.data;
    }
    catch(e){
        console.log(e.data);
    } 
    
}

// GET_BOARDS
async function getLists() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);
    //console.log(params);
    let res;

    const username = '';
    const password = '';
    const usernamePasswordBuffer = Buffer.from(username + ':' + password);
    const base64data = usernamePasswordBuffer.toString('base64');
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64data}`,
        }
    });

    try {
        res = await axiosObject.get(
            //`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`
            //'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_boards'
            'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_lists'
            //'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_tasks_id'
        );
        //console.log(res.data);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    } 
    //let res = await axios.get(`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`);
    //let res = await axios.get(`http://httpbin.org/get?${params}`);
    //let res = await axios.get("http://httpbin.org/get", payload);
    

    //let data = res.data;
    //console.log(data);
    
}

async function getBoards() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);
    //console.log(params);
    let res;

    const username = '';
    const password = '';
    const usernamePasswordBuffer = Buffer.from(username + ':' + password);
    const base64data = usernamePasswordBuffer.toString('base64');
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64data}`,
        }
    });

    try {
        res = await axiosObject.get(
            //`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`
            'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_boards'
            //'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_lists'
            //'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_tasks_id'
        );
        //console.log(res.data);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    } 
    //let res = await axios.get(`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`);
    //let res = await axios.get(`http://httpbin.org/get?${params}`);
    //let res = await axios.get("http://httpbin.org/get", payload);
    

    //let data = res.data;
    //console.log(data);
    
}

async function getTasks() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);
    //console.log(params);
    let res;

    const username = '';
    const password = '';
    const usernamePasswordBuffer = Buffer.from(username + ':' + password);
    const base64data = usernamePasswordBuffer.toString('base64');
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64data}`,
        }
    });

    try {
        res = await axiosObject.get(
            //`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`
            //'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_boards'
            //'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_lists'
            'http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?get_tasks_id'
        );
        //console.log(res.data);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    } 
    //let res = await axios.get(`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`);
    //let res = await axios.get(`http://httpbin.org/get?${params}`);
    //let res = await axios.get("http://httpbin.org/get", payload);
    

    //let data = res.data;
    //console.log(data);
    
}

const createListsTable = () => {
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

function dropBoardsTable(){
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

function dropListsTable(){
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

function dropTasksTable(){
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

function createBoardsTable(){
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

function createTasksTable(){
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

function selectDataFromBoards(){
    const query = `
    SELECT *
    FROM boards
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

function selectDataFromLists(){
    const query = `
    SELECT *
    FROM lists
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

function selectDataFromTasks(){
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

function insertDataToBoards(id, name){
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

function insertDataToBoards2(id, name){
    const query = `INSERT INTO boards (id, name) VALUES ($1, $2) RETURNING *`;

    console.log('Data insert prepare');
    client.query(query, [id, name], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    });

}

const createBoardRecord = async (body) => {
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

const updateListsRecord = async (body) => {
  return new Promise(function(resolve, reject) {
    const { id, name } = body;
    console.log(`createListsRecord:`);
    console.log(`${id} ${name}`);
    client.query(`UPDATE lists SET name = ($2) WHERE id = ($1) RETURNING *`, [id, name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new list record has been added: ${results.rows[0]}`)
    })
  })
}

const getSaveBoards = async () => {
    let arrBoards = await getBoards();
    console.log(`getSaveBoards`);
    //console.log(arrBoards);
    await arrBoards.forEach(element => {
        createBoardRecord({id: element.id, name:element.name});     
    });
}

const getSaveLists = async () => {
    //await clearDataFromBoardsTable();
    let arrLists = await getLists();
    
    //console.log(`getSaveLists`);
    console.log(arrLists);
    //let arr = JSON.parse(arrLists);
    //let obj = { id: arrLists[0].id, name: arrLists[0].name};
    //await client.connect();
    //await createBoardRecord({ id: 1111, name: 'gfhghgfh'});
    //await createListsRecord(obj);
    await arrLists.forEach(element => {
        createListsRecord({id: element.id, name:element.name});     
    });
}

const getSaveTasks = async () => {
    //await clearDataFromBoardsTable();
    let arrTasks = await getTasks();
    //console.log(`getSaveLists`);
    //let arr = JSON.parse(arrTasks);
    //console.log(typeof arrTasks);
    //console.log(arrTasks[0]);
    //console.log(arrTasks[1]);
    //console.log(arrTasks[2]);
    //console.log(arrTasks[3]);
    //console.log(arrTasks[4]);
    //console.log(arrTasks[5]);
    //let obj = { id: arrLists[0].id, name: arrLists[0].name};
    //await client.connect();
    //await createBoardRecord({ id: 1111, name: 'gfhghgfh'});
    //await createListsRecord(obj);
    let n = 0;
    await arrTasks.forEach(element => {
        console.log(element);
        
        //if (n>1){
        createTasksRecord({id: element.id, name:element.name, list_id: element.list_id, task_on_list_order:element.task_on_list_order});     
        //}
        //n = n+1;
    });
}

const getListTreeData = async () => {
    let listTasks = await get_List_Tree_Data();
    console.log(listTasks);
    return listTasks;
    //let arr = JSON.parse(listTasks);
    //console.log(arr);
    //let obj = { id: arrLists[0].id, name: arrLists[0].name};
    //await client.connect();
    //await createBoardRecord({ id: 1111, name: 'gfhghgfh'});
    //await createListsRecord(obj);
    //await listTasks.forEach(element => {
    //    createListsRecord({id: element.id, name:element.name});     
    //});
}

//createListsTable();
//createBoardsTable();
//console.log(`creating table`);
//dropBoardsTable();
//dropListsTable();
//createBoardsTable();
//createListsTable();
//insertDataToBoards();
//insertDataToBoards2(`tratara_id`, `tratata_name`);
//selectDataFromBoards();
//clearDataFromBoards();
//createBoardRecord({ id: 2, name: 'gfhghgfh_new1'});
//selectDataFromBoards();
//boards = getBoards();
//console.log(`logging boards`);
//console.log(boards);
//client.end();
//clearDataFromBoardsTable();
//getSaveBoards();
//getSaveLists();
//createTasksTable();
//getSaveTasks();
getListTreeData();
//selectDataFromLists();
//selectDataFromBoards();
//clearDataFromTasksTable();
//selectDataFromTasks();

module.exports = {
  getSaveBoards,
  getSaveLists,
  getSaveTasks,
  getBoards,
  getLists,
  getTasks,
  getListTreeData
}