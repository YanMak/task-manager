const axios = require('axios');
const FormData = require('form-data');
const url = require('url');
const fs = require('fs');

const createAxiosObject = () => {
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

  return axiosObject;
};

const AXIOS = createAxiosObject();
const crmUrl = `http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c`;

////////////////////////////////////////
// QUERIES TO HD API (

async function getLists() {

    try {
        res = await AXIOS.get(crmUrl + `?get_lists&ggg=11111`);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

async function getListTreeData() {

    let id = '602561331f046837909887a5';
    try {
        res = await AXIOS.get(crmUrl + `?get_list_tree_data&id=`+id);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

async function getBoards() {

    try {
        res = await AXIOS.get(crmUrl + `?get_boards&ggg=11111`);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// ARCHIVE
// GET_BOARDS
async function getLists_archive() {

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

// hd_get_List_Tree_Data
async function getListTreeData_archive() {

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

module.exports = {
  getBoards,
  getLists,
  getTasks,
  getListTreeData
}