

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express');
const PORT = 8000;
const HOST = '127.0.0.1';
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



//Portti kuuntelemaan 
//Luodaan tyhja 5x5 taulu
app.listen(PORT, HOST, function() {
  console.log("Serveri pystyssa ja pyorii @ http://" + HOST + ":" + PORT);
});
app.get('/random', function(req, res) {
  var tyhja = [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
];

 
//Random paikka laivalle
var paikka = 1 + Math.floor(Math.random() * 3);

if(paikka == 1){
  tyhja[1][4] =  1
  tyhja[2][4] =  1
  tyhja[3][4] =  1

}

if(paikka == 2){
  tyhja[2][2] =  1
  tyhja[3][2] =  1
  tyhja[4][2] =  1

}

if(paikka == 3){
  tyhja[4][1] =  1
  tyhja[4][2] =  1
  tyhja[4][3] =  1

}





  console.log("Odota hetki!!");
  console.log(paikka);
  res.send(tyhja);
});




const promise = new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://127.0.0.1:8000/random');
  request.onload = () => {
    if (request.status === 200) {
      resolve(request.responseText); // we got data here, so resolve the Promise
    } else {
      reject(Error(request.statusText)); // status is not 200 OK, so reject
    }
  };

  request.onerror = () => {
    reject(Error('Error fetching data.')); // error occurred, reject the  Promise
  };

  request.send(); // send the request
});

console.log('Asynchronous request made.');

promise.then((data) => {
  console.log("Laivan paikka on seuraava");
  console.log(JSON.parse(data));
 
}, (error) => {
  console.log('Promise rejected.');
  console.log(error.message);
});


