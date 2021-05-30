const axios = require('axios');
const FormData = require('form-data');
const url = require('url');
const fs = require('fs');

const createAxiosObject = (username = '', password = '') => {
  //const username = '';
  //const password = '';
  //console.log(`createAxiosObject ${username} ${password}`);
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
const AXIOSERP = createAxiosObject('exch_user', 'exch_user');
let crmUrl = `http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c`;
//crmUrl = `http://app-trd0.fcont.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c`;
crmUrl = `http://corp.incity.ru:88/crm_10/hs/HDGET/GetFrom1c`;
const ERPUrl = "http://corp.incity.ru:88/trade_11042021/hs/incity_bitrix_documents_uploading/push_exchange";

//                                       trade_11042021/hs/Incity_bitrix_documents_uploading/push_exchange?isnodejs&issales&year=2021
//              http://app-trd0.fcont.ru:88/trade_11042021/hs/Incity_bitrix_documents_uploading/push_exchange?isnodejs&issales
//http://app-trd0.fcont.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?id=602561331f046837909887a5&mode=html
//http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c?id=602561331f046837909887a5&mode=html

////////////////////////////////////////
// QUERIES TO HD API (

async function getLists() {

    try {
        
        let src = crmUrl + `?get_lists&ggg=11111`
        //console.log('getLists ' + src);
        res = await AXIOS.get(src);
        //console.log(res.data);
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

const setOverallResults = async(data) =>{
        
        var allPoints = 0;
        var completedPoints = 0;

        if (data.уровень < 2){
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

async function getBoards() {

    try {
        res = await AXIOS.get(crmUrl + `?get_boards&ggg=11111`);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

async function getTasksId() {

    try {
        res = await AXIOS.get(crmUrl + `?get_tasks_id&ggg=11111`);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }    
}

async function postLists() {

    let payload = { id: '111111112', name: 'gardener' };
    
    try {
        res = await AXIOS.post(`http://89.223.93.142:3001/createlist?id=11111&name=11111`, payload);
        return res.data;
    }
    catch(e){
        console.log(e.data);
    }       
}

//////////////////////////////////////////
// CHART
/*async function getChartData() {

    //let id = '602561331f046837909887a5';
    try {
        let src = ERPUrl + "?isnodejs&issales";
        console.log(src);
        let res = await AXIOSERP.get(src);
        //processListData(res.data.задачи);
        //return res.data;
        console.log(res);
    }
    catch(e){
        //console.log(e.data);
        //console.log(e);
    }    
}
*/

const getERPData = async (tool = 'sales') =>{
    try {
        //console.log('before axios');
        //const crmUrl = `http://corp.incity.ru:88/crm_10/hs/HDGET/push_exchange/GetFrom1c`;
        //console.log(ERPUrl);
        let src = 'http://app-trd0.fcont.ru:88/trade_11042021/hs/Incity_bitrix_documents_uploading/push_exchange?isnodejs&issales';
        src = 'http://corp.incity.ru:88/OnlineStore/hs/incity_online_monitoring/get_chart_data?isnodejs&year1=2021&year2=2019';
        res = await AXIOSERP.get(src);
        //console.log('**********************************');
        //console.log(res.data);
        //console.log('**********************************');
        //let expData = await processERPData(res.data);
        //console.log(res.data);
        
        console.log('**********************************JSON.stringify(res.data)');
        console.log(JSON.stringify(res.data));
        console.log('**********************************');
        let expData = await processERPDataMain(res.data);
        
        console.log('**********************************JSON.stringify(expData[0].data)');
        console.log(JSON.stringify(expData));
        console.log('**********************************');
                
        expData[0].data = await convertDataForChartSeries(expData[0].data);
        expData[1].data = await convertDataForChartSeries(expData[1].data);
        
        //console.log(JSON.stringify(expData[0].data));

        //return chartData;
       return expData;
       //hhhjhjh jjjkkhkhk
    //let js = JSON.stringify(res.data);
    //let j = JSON.parse(js);
    //console.log(j);
    //res.status(200).json(js);
    //res.status(200).JSON(rows);


        //console.log('return res.data');
        return res.data;
    }
    catch(e){
        console.log(e);
    }
}

// we decide that data is arr ob objects
// data = [{year = 2021, data: [///]}, {year = 2019, data: [///]}]
const processERPDataMain = async (data) => {
    // test version
    //console.log(JSON.stringify(data[0].data));

    let year1 = data[0].year;
    let year2 = data[1].year;

    console.log(data[0].year);
    console.log(data[1].year);
    console.log(data[0].data);

    console.log('*** processERPDataMain');
    let year1Data = processERPData(data[0].data);//current
    let year2Data = processERPData(data[1].data);//previous period
    console.log(year1Data);
    
    let obj = [{year : year1, data: year1Data}, {year : year2, data: year2Data}];
    //console.log(obj);
    return obj;
}

const processERPData = async (data) =>{
    //[{"Дата":1619823599,"КаналПродаж":"СРС","Сумма":5000,"Себестоимость":1000,"Заказ":15},{"Дата":1622501999,"КаналПродаж":"СРС","Сумма":5000,"Себестоимость":1000,"Заказ":15}]
    //  {
//    'Дата': 1619823599,
//    'КаналПродаж': 'СРС',
//    'СуммаПродажи': 993879,
//    'СебестоимостьПродажи': 351471,
//    'ЗаказыПродажи': 701,
//    'ЗаказОформлено': 1949,
//    'СуммаОформлено': 6171090
//  }

    //(new Date(1000*1612133999)).getTime()
    // we prepare self dataset for each chart
    // first 
    // Получается 2 раздела: 1) Продажи 2) Заказы
    // В продажах 3 графика: 1) стоимость 2) кол-во 3) наценка
    // В заказах 2 графика: 1) стоимость 2) кол-во
    // sales {{year:2021, part:"sales/orders", type: "cost/quantity", data: []}}
    //const dataExp = {'SRN', type: 'quantity', 'date', 'value', 'type'};

    let expData = {
        srn: {
            sales:{
                summ: [],
                cost: [],
                quantity: [],
            },
            orders:{
                summ: [],
                quantity: [],
            } 
        },
        courier: {
            sales:{
                summ: [],
                cost: [],
                quantity: [],
            } ,
            orders:{
                summ: [],
                quantity: [],
            } 
        }
    };
    console.log(data);
    console.log(data);

    for (let i = 0; i<data.length; i++){
        elem = data[i];
        // sales
        if (elem.КаналПродаж === 'СРС'){
            expData.srn.sales.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаПродажи]);
            expData.srn.sales.cost.push([(new Date(1000*elem.Дата)).getTime(), elem.СебестоимостьПродажи]);
            expData.srn.sales.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказыПродажи]);

            expData.srn.orders.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаОформлено]);
            expData.srn.orders.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказОформлено]);

        }
        else
        {
            expData.courier.sales.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаПродажи]);
            expData.courier.sales.cost.push([(new Date(1000*elem.Дата)).getTime(), elem.СебестоимостьПродажи]);
            expData.courier.sales.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказыПродажи]);

            expData.courier.orders.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаОформлено]);
            expData.courier.orders.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказОформлено]);
        }
    }
    //console.log(JSON.stringify(expData));
    //console.log(expData));
    return expData;
}

const convertDataForChartSeriesMain = async (expData) => {
    //console.log('**********************************');
    //console.log(expData);
    //console.log(JSON.stringify(expData));
    let arr = [];
    arr.push(
        {
            name: 'Продажи: сумма', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.sales.summ },
                { name:'КУРЬЕРЫ', data: expData.courier.sales.summ }
            ] 
        },
        {
            name: 'Продажи: количество заказов', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.sales.quantity },
                { name:'КУРЬЕРЫ', data: expData.courier.sales.quantity }
            ] 
        },        
        {
            name: 'Продажи: себестоимость', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.sales.cost },
                { name:'КУРЬЕРЫ', data: expData.courier.sales.cost }
            ] 
        },
        {
            name: 'Поступившие заказы: сумма', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.orders.summ },
                { name:'КУРЬЕРЫ', data: expData.courier.orders.summ }
            ] 
        },
        {
            name: 'Поступившие заказы: количество', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.orders.quantity },
                { name:'КУРЬЕРЫ', data: expData.courier.orders.quantity }
            ] 
        }


        
        );
    //console.log(JSON.stringify(arr));
    console.log(JSON.stringify(arr[1]));
    return arr;
    
       //alert(arr);
    /*arr.push(expData.srn.sales.cost);
    arr.push(expData.srn.sales.quantity);
    arr.push(expData.srn.orders.summ);
    arr.push(expData.srn.orders.quantity);
    arr.push(expData.srn1.sales.summ);
    arr.push(expData.srn.sales.cost);
    arr.push(expData.srn.sales.quantity);
    arr.push(expData.srn.orders.summ);
    arr.push(expData.srn.orders.quantity);
    */
}

const convertDataForChartSeries = async (expData) => {
    
    //console.log('**********************');
    //console.log(expData);
    let arr = [];
    arr.push(
        {
            name: 'Продажи: сумма', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.sales.summ },
                { name:'КУРЬЕРЫ', data: expData.courier.sales.summ }
            ] 
        },
        {
            name: 'Продажи: количество заказов', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.sales.quantity },
                { name:'КУРЬЕРЫ', data: expData.courier.sales.quantity }
            ] 
        },        
        {
            name: 'Продажи: себестоимость', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.sales.cost },
                { name:'КУРЬЕРЫ', data: expData.courier.sales.cost }
            ] 
        },
        {
            name: 'Поступившие заказы: сумма', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.orders.summ },
                { name:'КУРЬЕРЫ', data: expData.courier.orders.summ }
            ] 
        },
        {
            name: 'Поступившие заказы: количество', 
            container: '', 
            series:[
                { name:'СРС', data: expData.srn.orders.quantity },
                { name:'КУРЬЕРЫ', data: expData.courier.orders.quantity }
            ] 
        }


        
        );
    //console.log(JSON.stringify(arr));
    //console.log(JSON.stringify(arr[1]));
    return arr;
    
       //alert(arr);
    /*arr.push(expData.srn.sales.cost);
    arr.push(expData.srn.sales.quantity);
    arr.push(expData.srn.orders.summ);
    arr.push(expData.srn.orders.quantity);
    arr.push(expData.srn1.sales.summ);
    arr.push(expData.srn.sales.cost);
    arr.push(expData.srn.sales.quantity);
    arr.push(expData.srn.orders.summ);
    arr.push(expData.srn.orders.quantity);
    */
}

//getLists();
getERPData();
//getERPData();

//getChartData();

module.exports = {
  getBoards,
  getLists,
  getTasksId,
  getListTreeData,
  postLists,
  getERPData
}