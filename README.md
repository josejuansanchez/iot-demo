# iot-demo

IoT demo

## MQTT *broker*

### Instalación

Instalamos [mosquitto][1], un  *broker* [MQTT][2] *open source* usado para la comunicación entre dispositivos en el [IoT][3].

```bash
sudo apt-get install -y mosquitto mosquitto-clients
```

### Configuración

Configuramos [mosquitto][1] para que acepte conexiones de red desde cualquier interfaz del servidor. Editamos el archivo:

```
/etc/mosquitto/mosquitto.conf 
```

y añadimos la siguiente línea:

```
bind_address 0.0.0.0
```

### Publicar mensajes en un *topic*

``` 
mosquitto_pub -h <host> -t <topic> -m <mensaje>
```

Por ejemplo, el comando:

``` 
mosquitto_pub -h 192.168.20.21 -t iot -m "hello world!"
```

Publica el mensaje `"hello world!"` en el topic `iot` en el [MQTT][2] *broker* que está en la IP `192.168.20.21`.

### Suscribirse a un *topic* 

```
mosquitto_sub -h <host> -t <topic>
```

Por ejemplo, el comando:

```
mosquitto_sub -h 192.168.1.171 -t iot
```

Se suscribe al topic `iot` que está en el [MQTT][2] *broker* con dirección IP `192.168.20.21`.

## Ejemplo

En cada aula del instituto podríamos tener un sensor de temperatura y humedad e ir publicando los valores que vamos obteniendo. Podríamos tener los dos siguientes *topics* para el `aula20`:

```
ies/aula20/temperature
ies/aula20/humidity
```

## Licencia

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />Esta obra está bajo una <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">licencia de Creative Commons Reconocimiento-CompartirIgual 4.0 Internacional</a>.



[1]: https://mosquitto.org
[2]: http://mqtt.org
[3]: https://es.wikipedia.org/wiki/Internet_de_las_cosas