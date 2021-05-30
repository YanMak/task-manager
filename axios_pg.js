//const { Client } = require('pg');
const hd = require('./hd')
const db_queries = require('./db_queries')
const crm_queries = require('./crm_queries')

//const client = new Client({
//    user: 'postgres',
//    host: 'localhost',
//    database: 'mytestdb',
//    password: 'ktulhuverner545',
//    port: 5432,
//});

//client.connect();
//console.log(`connected to ${client.database}`);

const getListTreeData = async () => {
    let listTasks = await crm_queries.getListTreeData();
    //console.log(listTasks);
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

const printListsData = async () =>{
    rows = await db_queries.selectDataFromLists();
    //console.log(`1`);
    console.log(JSON.stringify(rows));
    //console.log(`2`);
    //for (let row of data) {
    //    console.log(row);
    //}

    //await console.log(data);
}

//db_queries.selectDataFromLists();
//db_queries.createListsRecord({id: '1111111111', name: 'test_list'});
//printListsData();
//hd.getSaveTasks();
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
//getListTreeData();
//db_queries.selectDataFromLists();
//selectDataFromBoards();
//clearDataFromTasksTable();
//db_queries.selectDataFromTasks();
//console.log(getListTreeData());

//module.exports = {
//  getSaveBoards,
//  getSaveLists,
//  getSaveTasks,
//  getListTreeData
//}