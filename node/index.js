/* Server Implementation */

var request = require('request');
var ws      = require("nodejs-websocket");

var URL = "http://ron-swanson-quotes.herokuapp.com/v2/quotes/100"

/*  request is sent to the given url and the array of results is received */

var getDetailsFromURL = function (url, callback) {
  console.log("sending request");
  request(url, function (error, response, body) {

    if(error || response.statusCode != 200){
      console.log("request error");
      callback(error);
      return;
    }
    console.log("response received");
    var json,jsonpData = body;
    try{
       json = JSON.parse(jsonpData);
    }catch(e){
        var startPos  = jsonpData.indexOf('([') ? jsonpData.indexOf('([') : jsonpData.indexOf('({');
        var endPos    = jsonpData.indexOf('])') ? jsonpData.indexOf('])') : jsonpData.indexOf('})')
        json          = JSON.parse(jsonpData.substring(startPos+1, endPos+1));
    }
    callback(null, json);
  });
};

/* WEB SOCKET SIMULATION */
/*  A Web Socket is opened and the array of data is placed in the socket */
var createWS = function(data){
  console.log("createWS",data);
  var server = ws.createServer(function (conn) {
      var initialLength = data.length - 2 - 1;

      //in the SIMULATION, all the data in the array is placed in the web socket. ( except 2 elements)
      data.forEach((dataElement,index) => {
        if(index >= initialLength){
          return false;
        }
        conn.send(JSON.stringify(dataElement));
      });

      //in the SIMULATION, the rest 2 elements are placed in the web socket after a time out,
      //to demonstrate the front end Implementation
      // as in real time addition of elements into the array after some time is also possible.

      setTimeout(function () {
        for (var i = initialLength; i < data.length; i++) {
          conn.send(JSON.stringify(data[i]));
        }
      }, 9000);

      conn.on("close", function (code, reason) {
          console.log("Connection closed")
      });
  }).listen(8001)
};

getDetailsFromURL(URL, function (err, data) {
  createWS(data);
});
