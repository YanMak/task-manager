const axios = require('axios');
const fs = require('fs');

const piblikKey = "project_public_2e681ee2f26b5bb75c0d01d5b86acda5_EtXFabec1292790aca881d4b21ab1b695a375";
const secretKey = "secret_key_f704cfd2f86593e154b26ff9de5601fb_ej9923319301f2348124b8623964b7884bc10";

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

const newTask = async (tool = "resize") =>{
    //let id = '602561331f046837909887a5';
    try {
        res = await AXIOS.get('https://api.iloveimg.com/v1/start/' + resize);
        processListData(res.data.задачи);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}



async function getListTreeData(id = `602561331f046837909887a5`) {

    //let id = '602561331f046837909887a5';
    try {
        res = await AXIOS.get(crmUrl + `?get_list_tree_data&id=`+id);
        processListData(res.data.задачи);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}
https://api.iloveimg.com/v1/start/{tool}