var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://192.168.20.21')

var fs = require('fs');
var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  fs.readFile(__dirname + '/public/index.html', function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Not Found");
      res.end();
    } else {
      res.writeHead(200);
      res.write(data, "utf8");
      res.end();
    }
  });
});

io.sockets.on('connection', function(socket) {
});

client.on('connect', function () {
  client.subscribe('ies/aula20/temperature');
  client.subscribe('ies/aula20/humidity');
})  

client.on('message', function (topic, message) {
  console.log(topic);
  console.log(message.toString());

  if (topic == "ies/aula20/temperature") {
    io.sockets.emit('temperature', { raw: message.toString() });
  }

  if (topic == "ies/aula20/humidity") {
    io.sockets.emit('humidity', { raw: message.toString() });
  }
})

console.log('Server app listening on port 3000...');