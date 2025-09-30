#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>            //Library to communicate on the OneWire bus
#include <DallasTemperature.h>  //Library to get readings from DS18B20
#include <DHT.h>                  // Library for DHT11 humidity sensor
#include <ArduinoJson.h>


//--------WiFi-----------
const char* ssid = "Design Studio";
const char* password = "123456789";

//---------Server------------
const char* serverUrl = "http://YOUR_SERVER_IP:PORT/endpoint"


// -------------------- DS18B20 Setup --------------------
#define ONE_WIRE_BUS 4   // GPIO4 for DS18B20
OneWire oneWire(ONE_WIRE_BUS);  //Setting up a OneWire instance to communicate with any OneWire device
DallasTemperature ds18b20(&oneWire);  //Passing the OneWire reference to Dallas Temperature library

// -------------------- DHT11 Setup ----------------------
#define DHTPIN 5                  // GPIO5 connected to DHT11 data pin
#define DHTTYPE DHT11             // Define the sensor type
DHT dht(DHTPIN, DHTTYPE);        // Create DHT instance

// -------------------- Soil Moisture Setup ----------------
#define SOIL_PIN 2                // ADC pin for capacitive soil moisture sensor
#define MOISTURE_DRY 3000
#define MOISTURE_WET 1200

void setup() {
  Serial.begin(115200); //Start serial monitor for debugging
  
   // Connect WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");

  ds18b20.begin();      //Start communication with the DS18B20 sensor
  dht.begin();          // Initialize DHT11 sensor
}

void loop() {

  // -------- DS18B20 Reading --------
  ds18b20.requestTemperatures();    // Request temperature readings
  float dsTemp = ds18b20.getTempCByIndex(0); //Get temperature in Celcius

    //If no sensor found show warning
  if (dsTemp == DEVICE_DISCONNECTED_C) {
    Serial.println("DS18B20 not detected!");
    
    //Else print temperature value to serial monitor
  } else {
    Serial.print("DS18B20 Temperature: ");
    Serial.print(dsTemp);
    Serial.println(" °C");
  }

  // -------- DHT11 Reading --------
 float humidity = dht.readHumidity();  // Read humidity
 //float airTemp = dht.readTemperature();    // Read temperature in Celsius
 
 
 if (isnan(humidity) || isnan(airTemp)) {   // Check if reading failed
    Serial.println("Failed to read from DHT11!");
  } else {
    Serial.print("DHT11 Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
    //Serial.print("DHT11 Temperature: ");
    //Serial.print(airTemp);
    //Serial.println(" °C");
  }

 // --- Read Soil Moisture ---
  int soilRaw = analogRead(SOIL_PIN);
  int soilPercent = map(soilRaw, MOISTURE_DRY, MOISTURE_WET, 0, 100);
  soilPercent = constrain(soilPercent, 0, 100);

  // --- Create JSON ---
  StaticJsonDocument<200> doc;
  doc["device_id"] = 1;
  doc["temperature"] = dsTemp;
  doc["humidity"] = humidity;
  doc["soil_moisture"] = soilPercent;

  String jsonData;
  serializeJson(doc, jsonData);

  // --- Send HTTP POST ---
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.print("Server response: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }

  delay(5000); // every 5 seconds
}
