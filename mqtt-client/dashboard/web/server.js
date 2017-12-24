var mqtt = require('mqtt')

const MQTT_SERVER = '192.168.1.200'
//const MQTT_SERVER = 'test.mosquitto.org'
const MQTT_TOPIC_TEMPERATURE = 'ies/aula20/temperature'
const MQTT_TOPIC_HUMIDITY = 'ies/aula20/humidity'

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://' + MQTT_SERVER)

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
  client.subscribe(MQTT_TOPIC_TEMPERATURE);
  client.subscribe(MQTT_TOPIC_HUMIDITY);
})  

client.on('message', function (topic, message) {
  console.log(topic);
  console.log(message.toString());

  if (topic == MQTT_TOPIC_TEMPERATURE) {
    io.sockets.emit('temperature', { raw: message.toString() });
  }

  if (topic == MQTT_TOPIC_HUMIDITY) {
    io.sockets.emit('humidity', { raw: message.toString() });
  }
})

console.log('Server app listening on port 3000...');