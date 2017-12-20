#include <ESP8266WiFi.h>
 
void setup() {
  delay(500);
  Serial.begin(115200); 
  Serial.print("MAC: ");
  Serial.println(WiFi.macAddress());
}
 
void loop() {
}
