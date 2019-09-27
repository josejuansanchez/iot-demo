var mqtt = require('mqtt')

// Solution to bypass firewall restrictions with port 1883
const MQTT_SERVER = '192.168.8.215'
const MQTT_PORT = 80

//const MQTT_SERVER = 'test.mosquitto.org'
//const MQTT_PORT = 1883

const MQTT_TOPIC_TEMPERATURE = 'iescelia/aula1/temperature'
const MQTT_TOPIC_HUMIDITY = 'iescelia/aula1/humidity'

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://' + MQTT_SERVER + ":" + MQTT_PORT)

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