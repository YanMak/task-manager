const axios = require('axios');
const FormData = require('form-data');
const url = require('url');
const fs = require('fs');
//18052021
const sftp = require('./sftp_queries');
const crm = require('./crm_queries');

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
const crmUrl = `http://89.223.93.142:3001/`;

async function getListsFromExpress() {

    try {
        res = await AXIOS.get(crmUrl + `lists?get_lists&ggg=11111`);
        console.log(res.data);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

async function getListTreeDataFromExpress() {
    try {
        res = await AXIOS.get(crmUrl + `api_list_data?id=602561331f046837909887a5`);
        //11052021
        console.log('________________________________________________________________________');
        processListData(res.data.задачи);
        console.log(res.data.задачи[0][0]);
        //console.log(JSON.stringify(res.data));
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

const setOverallResults = async(data) =>{
        
        var allPoints = 0;
        var completedPoints = 0;

        if (data.уровень < 4){
        var allPointsName = 'всегопунктов';
        var completedPointsName = 'выполненопунктов';
        var ChildPointsArrayName = 'строки';

        for (var key in data) {
            var val = data[key];
            
            if (key === allPointsName){
                allPoints = val;    
            }
            if (key === completedPointsName){
                completedPoints = val;    
            }
        }
        
        var completed = false;
        if (completedPoints >= allPoints){
          completed = true;
        }
        
        data.выполнено = completed;
        }
}

//11052021 count results: summ, completed
const processListData = async (data) => {
    var a = data;
    var s = '';
    
    //console.log(JSON.stringify(a));
    a.forEach(function(entry) {

        if (Array.isArray(entry)){
            var entryElem = entry[0];
        } 
        else
        {
            var entryElem = entry;
        }

        
        setOverallResults(entryElem);

        var ChildPointsArrayName = 'Строки';

        for (var key in entryElem) {
            var val = entryElem[key];
            
            if (key === 'Наименование'){
                s = s + ' ' + key + '=' + val;
            }
            
            if (key === ChildPointsArrayName){
                //console.log('****' + key + '::::' + JSON.stringify(val));
                
                processListData(val);    
                /*var childArr = val;
                childArr.forEach(element => {
                  console.log('!!!!!!!!!!!!' + element.уровень + ' ' + element.Наименование + JSON.stringify(element));
                  processListData(element);    
                  //console.log('****childArr*****' + JSON.stringify(element));
                });
                */
            }
        }
        
        /*
        var completed = false;
        if (completedPoints >= allPoints){
          completed = true;
        }
        
        entry[0].выполнено = completed;
        */
   
    });
}

const test = async ()=>{
    let res = await crm.getERPData();
    console.log(res);
}

test();
//getListsFromExpress();
//getListTreeDataFromExpress();
//sftp.testList();
//sftp.letsProcessArticle("2.1.2.20.06.59.02424_006129");