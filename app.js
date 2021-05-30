const express = require('express')
const app = express()
const port = 3000
const hbs = require("hbs");

app.use(express.bodyParser());

app.post('/', function(req, res){
    console.log(req.body.foo);
    res.send('ok');
});

hbs.registerHelper("getTime", function(){
     
  var myDate = new Date();
  var hour = myDate.getHours();
  var minute = myDate.getMinutes();
  var second = myDate.getSeconds();
  if (minute < 10) {
      minute = "0" + minute;
  }
  if (second < 10) {
      second = "0" + second;
  }
  return "Текущее время: " + hour + ":" + minute + ":" + second;
});

hbs.registerHelper("createStringList", function(array){
     
  var result="";
  for(var i=0; i<array.length; i++){
      result +="<li>" + array[i] + "</li>";
  }
  return new hbs.SafeString("<ul>" + result + "</ul>");
});

app.set('view engine', 'hbs')

app.use('/contact', function (request, response) {
  response.render('contact.hbs', {
    title: 'Мои контакты',
    emailsVisible: true,
    emails: ['gavgav@mycorp.com', 'mioaw@mycorp.com', 'app.js@'],
    phone: '+1234567890',
    fruit: [ "apple", "lemon", "banana", "grape"]
  })
})

app.use('/', function (request, response) {
  response.send('Главная страница')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})