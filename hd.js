const db_queries = require('./db_queries')
const crm_queries = require('./crm_queries')


const getSaveBoards = async () => {
    let arrBoards = await crm_queries.getBoards();
    //console.log(`getSaveBoards`);
    console.log(arrBoards);
    await arrBoards.forEach(element => {
        db_queries.createBoardsRecord({id: element.id, name:element.name});     
    });
}

const getSaveLists = async () => {
    //await clearDataFromBoardsTable();
    let arrLists = await crm_queries.getLists();
    
    //console.log(`getSaveLists`);
    console.log(arrLists);
    //let arr = JSON.parse(arrLists);
    //let obj = { id: arrLists[0].id, name: arrLists[0].name};
    //await client.connect();
    //await createBoardRecord({ id: 1111, name: 'gfhghgfh'});
    //await createListsRecord(obj);
    await arrLists.forEach(element => {
        db_queries.createListsRecord({id: element.id, name:element.name});     
    });
}

const getSaveTasks = async () => {
    //await clearDataFromBoardsTable();
    let arrTasks = await crm_queries.getTasks();
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
        db_queries.createTasksRecord({id: element.id, name:element.name, list_id: element.list_id, task_on_list_order:element.task_on_list_order});     
        //}
        //n = n+1;
    });
}

module.exports = {
  getSaveBoards,
  getSaveLists,
  getSaveTasks
}