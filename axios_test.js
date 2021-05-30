const axios = require('axios');
const FormData = require('form-data');
const url = require('url');
const fs = require('fs');

async function getBoards() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);
    console.log(params);
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
    }
    catch(e){
        console.log(e.data);
    } 
    //let res = await axios.get(`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`);
    //let res = await axios.get(`http://httpbin.org/get?${params}`);
    //let res = await axios.get("http://httpbin.org/get", payload);
    

    let data = res.data;
    console.log(data);
}

async function getLists() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);
    console.log(params);
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
    }
    catch(e){
        console.log(e.data);
    } 
    //let res = await axios.get(`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`);
    //let res = await axios.get(`http://httpbin.org/get?${params}`);
    //let res = await axios.get("http://httpbin.org/get", payload);
    

    let data = res.data;
    console.log(data);
}

async function getTasksId() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);
    console.log(params);
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
    }
    catch(e){
        console.log(e.data);
    } 
    //let res = await axios.get(`http://corp.incity.ru:88/OnlineStore/hs/incity_bitrix_markirovka/get_markirovka?id=200558`);
    //let res = await axios.get(`http://httpbin.org/get?${params}`);
    //let res = await axios.get("http://httpbin.org/get", payload);
    

    let data = res.data;
    console.log(data);
}

async function getNumberOfFollowers() {

    let res = await axios.get('https://api.github.com/users/yanmak');
  
    let nOfFollowers = res.data.followers;
    let location = res.data.location;
  
    console.log(`# of followers: ${nOfFollowers}`)
    console.log(`Location: ${location}`)
  }
  
  async function makePostGetRequest() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    let res = await axios.post('http://httpbin.org/post', payload);

    let data = res.data;
    console.log(data);
}

async function makeFormGetRequest() {

    const form_data = new FormData();
    form_data.append('name', 'John Doe');
    form_data.append('occupation', 'gardener');

    let res = await axios.post('http://httpbin.org/post', form_data, 
        { headers: form_data.getHeaders() });

    let data = res.data;
    console.log(data);
}

//makeFormGetRequest();

//makePostGetRequest();

//getNumberOfFollowers();

//makeGetRequest();

var config = {
    responseType: 'stream'
};

let url_pict = 'https://images.dog.ceo/breeds/setter-english/n02100735_4870.jpg';

async function getImage() {

    let resp = await axios.get(url_pict, config);
    resp.data.pipe(fs.createWriteStream('image.jpg'));
    console.log('image.jpg');
}

async function makeRequests() {

    let [u1, u2] = await Promise.all([
        axios.get('https://api.github.com/users/janbodnar'),
        axios.get('https://api.github.com/users/symfony')
    ]);

    console.log(`Jan Bodnar: ${u1.data.created_at}`);
    console.log(`Symfony: ${u2.data.created_at}`);
}

//makeRequests();
//makeGetRequest();
//getImage();
getBoards();
//getlists();
//getTasksId();