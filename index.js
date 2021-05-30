//console.log('hello');
//04052021
const hd = require('./hd');
const db_queries = require('./db_queries');
const crm_queries = require('./crm_queries');
//18052021
const sftp = require('./sftp_queries');
const hbs = require("hbs");

//06052021
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//const dashboardRoutes = require('./routes/dashboard-Routes');

const express = require('express')
const app = express()
const port = 3001

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.send('Hello main page')
})

hbs.registerHelper('stringify', function (obj) {
    return JSON.stringify(obj);
})

hbs.registerHelper('concat', function (obj) {
  let str = ``;
  for (var key in obj) {
    if (key !== `строки`) {
      //str = str + obj[key];
      str = str + key + ' ';  
    }
  }
  return str;
})

hbs.registerHelper('checklistpointIsDone', function (obj) {
  if (obj.выполнено === true){
  //if (obj['выполнено']===true){
    return true;
  }
  return false
})

hbs.registerHelper('checklistpointIsDoneTest2', function (obj) {
  
  //let str = obj['Наименование'];
  //return JSON.stringify(obj);
  //return str;
  //return 'ffdvffd ' + JSON.stringify(obj);
  return obj['выполнено'] ;
  
  return 'ffdvffd ' + obj.Наименование + '-' 
  + obj['Наименование'] + ' ' 
  + obj['уровень'] + ' ' 
  + obj['выполнено'] ;

  let str = obj['Наименование'] + ' ' + obj['Выполнено'] + ' ' + obj['выполнено'] ;
  return str;
  if (obj.выполнено === true){
  //if (obj['выполнено']===true){
    return true;
  }
  return false
})

hbs.registerHelper('checklistpointIsDoneTest', function (obj) {
  
  //let str = obj['Наименование'];
  //return JSON.stringify(obj);
  //return str;
  //return 'ffdvffd ' + JSON.stringify(obj);
  return obj['выполнено'] ;
  
  return 'ffdvffd ' + obj.Наименование + '-' 
  + obj['Наименование'] + ' ' 
  + obj['уровень'] + ' ' 
  + obj['выполнено'] ;

  let str = obj['Наименование'] + ' ' + obj['Выполнено'] + ' ' + obj['выполнено'] ;
  return str;
  if (obj.выполнено === true){
  //if (obj['выполнено']===true){
    return true;
  }
  return false
})

hbs.registerHelper('taskArea', function (obj) {
  let str = obj['Наименование'];
  return str;
})

hbs.registerHelper('checklistArea', function (obj) {
  let str = obj['Наименование'];
  //return JSON.stringify(obj);
  return str;
})

hbs.registerHelper('checklistpointArea', function (obj) {
  //let str = obj['Наименование'];
  return JSON.stringify(obj);
  return str;
})

app.get('/chart', async (req, res) => {
  //res.render('contact04052021.hbs');

  try {

    res.render("chart.hbs", {
        //title: "Мои контакты",
        title: "ИМ" + JSON.stringify(req.query),
        description: "ИМ",
        //description: listdata_s,
        tasksVisible: true,
        //emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        tasks: [],
        phone: "+1234567890"
    });
  } catch (err) {
    res.status(500).send(err)
  }
})

// !!!! BACKUP of chart (
/*
app.get('/chart', async (req, res) => {
  //res.render('contact04052021.hbs');

  try {
    //let rows_ = await post_createlistrecord();
    //res.status(200).json(rows_);

    //server crm_10 temporary unevailable
    const rows = await db_queries.selectDataFromLists();
    const listdata = await crm_queries.getListTreeData(req.query.id);
    let listdata_s = JSON.stringify(listdata.задачи[0]);
 
    str = JSON.stringify(listdata.задачи[0][0][`Наименование`]);
    

    res.render("chart.hbs", {
        //title: "Мои контакты",
        title: listdata.наименование + JSON.stringify(req.query),
        description: str,
        //description: listdata_s,
        tasksVisible: true,
        //emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        tasks: listdata.задачи,
        phone: "+1234567890"
    });
  } catch (err) {
    res.status(500).send(err)
  }
})
*/
// ) BACKUP !!!!!!!

app.get('/api_list_data', async (req, res) => {
  try {

    const listdata = await crm_queries.getListTreeData(req.query.id);
    
    //let st = JSON.stringify(rows);
    res.status(200).send(listdata);
    //res.status(200).json(rows);
  } catch (err) {
    res.status(500).send(err)
  }
  
})

//processimages
app.get('/processarticle', async (req, res) => {
  try {

    //let ok = await sftp.letsProcessArticle("2.1.2.20.06.59.02424_006129");
    let ok = await sftp.letsProcessArticle(req.query.article);
    //ok = true;
    res.status(200).send(req.query.article + ' ' + ok);

  } catch (err) {
    res.status(500).send(err)
  }
  
})

//getChartData
app.get('/geterpdata', async (req, res) => {
  try {

    //let ok = await sftp.letsProcessArticle("2.1.2.20.06.59.02424_006129");
    let data = await crm_queries.getERPData();
    //let res = await crm.getERPData();
    //alert(res);
    console.log('!!!!' + data);
    //ok = true;
    res.status(200).send(data);

  } catch (err) {
    res.status(500).send(err)
  }
  
})

app.get('/articlehasprocessed', async (req, res) => {
  try {

    let ok = await sftp.letsFindOutIfHasProcessedImages(req.query.article);
    //ok = true;
    //res.status(200).send(req.query.article + ' ' + ok);
    res.status(200).send(ok);

  } catch (err) {
    res.status(500).send(err)
  }
  
})

app.get('/list_data', async (req, res) => {
  try {
    //let rows_ = await post_createlistrecord();
    //res.status(200).json(rows_);

    const rows = await db_queries.selectDataFromLists();
    const listdata = await crm_queries.getListTreeData(req.query.id);
    let listdata_s = JSON.stringify(listdata.задачи[0]);

    let str = ``;
    let obj = listdata.задачи[0][0];
    for (var key in obj) {
      if (key !== `строки`) {
        //str = str + obj[key];
        str = str + key + `:` + obj[key] + ` `;  
      }
    }

    str = JSON.stringify(listdata.задачи[0][0][`Наименование`]);

    res.render("list_data.hbs", {
        //title: "Мои контакты",
        title: listdata.наименование + JSON.stringify(req.query),
        description: str,
        //description: listdata_s,
        tasksVisible: true,
        //emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        tasks: listdata.задачи,
        phone: "+1234567890"
    });
    //let st = JSON.stringify(rows);
    //res.status(200).send(st);
    //res.status(200).json(rows);
  } catch (err) {
    res.status(500).send(err)
  }
  
})

app.get('/contact', async (req, res) => {
  //res.render('contact04052021.hbs');

  res.render("contact04052021.hbs", {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
  });
})

app.get('/lists_hbs', async (req, res) => {
  //res.render('contact04052021.hbs');
  try {
    //let rows_ = await post_createlistrecord();
    //res.status(200).json(rows_);
    
    const rows = await db_queries.selectDataFromLists();
    res.render("lists.hbs", {
        title: JSON.stringify(req.query),
        //title: `title`,
        emailsVisible: true,
        //emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        emails: rows,
        phone: "+1234567890"
    });
    //let st = JSON.stringify(rows);
    //res.status(200).send(st);
    //res.status(200).json(rows);
  } catch (err) {
    res.status(500).send(err)
  }
  
})


//app.use(express.bodyParser());

//app.use('/', function(request, response){
//    response.send("Главная страница");
//});

//app.use('/contact', function(request, response){
//     
//    response.render('contact04052021.hbs');
//});

app.get('/lists/', async (req, res) => {

  try {
    //let rows_ = await post_createlistrecord();
    //res.status(200).json(rows_);

    let rows = await db_queries.selectDataFromLists();
    //let st = JSON.stringify(rows);
    //res.status(200).send(rows);
    //res.status(200).JSON(rows);
    
    //rows = [{ggfh:111, hgj:65767}];
    let js = JSON.stringify(rows);
    let j = JSON.parse(js);
    res.status(200).json(js);
    //res.status(200).JSON(rows);
  } catch (err) {
    res.status(500).send(err)
  }

})

const post_createlistrecord = async (body) =>{
  //console.log(body);
  rows = await db_queries.createListsRecord({id: '1111111125', name: 'test_list'});
  return rows;
  //return [{name: 'chachacha1'},{name: 'chachacha2'}];
}

app.post('/createlist', async (req, res) => {
  try {
    
    //comment still
    //let rows_ = await post_createlistrecord();
    //res.status(200).json(rows_);
    
    //получаем параметры
    res.status(200).send(JSON.stringify(req.query));
    //res.status(200).send(JSON.stringify(req.body));
    
    //res.status(200).send('Hello World! createlist');
    } 
    catch (err) {
    res.status(500).send(err)
  }


  //let rows = await post_createlistrecord();
  //let body = req.body;
  //
  //let rows_s = json.stringify(rows);
  //res.status(200).send('Hello World! createlist');
  //res.status(200).send(rows_s);
  //rows = await = db_queries.createListsRecord({id: '1111111114', name: 'test_list'});
//  try
//    const rows = await db_queries.createListsRecord(req.body);
//    let st = JSON.stringify(rows);
//    res.status(200).send(st);
//  } catch (err) {
//    res.status(500).send(err)
//  }
})

//app.get('/', (req, res) => {
//  res.send('Hello World! 28042021 pm3')
//})

app.get('/test1', (req, res) => {
  res.send('Hello World! test1')
})

app.get('/test2', (req, res) => {
  res.send('Hello World! test2')
})

app.get('/test3', (req, res) => {
  res.send('Hello World! test3')
})

app.get('/hbs', (req, res) => {
  res.send('Hello World! hbs_')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})