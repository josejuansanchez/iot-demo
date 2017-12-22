#include <ESP8266WiFi.h>

// WiFi configuration
#define WLAN_SSID       "Put your SSID here"
#define WLAN_PASS       "Put your password here"

// In our scenario the DHCP is disabled 
// so we need to configure the network statically
IPAddress ip(192, 168, 1, 10);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

// WiFi connection
WiFiClient client;

//----------------------------------------------

void connectWiFi() {
  WiFi.config(ip, gateway, gateway, subnet);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

//----------------------------------------------

void setup() {
  Serial.begin(115200);
  connectWiFi();
}

void loop() {

}
