#include <OneWire.h>            //Library to communicate on the OneWire bus
#include <DallasTemperature.h>  //Library to get readings from DS18B20

#define ONE_WIRE_BUS 4   // GPIO4 for DS18B20

//Setting up a OneWire instance to communicate with any OneWire device
OneWire oneWire(ONE_WIRE_BUS);

//Passing the OneWire reference to Dallas Temperature library
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200); //Start serial monitor for debugging
  sensors.begin();      //Start communication with the DS18B20 sensor
}

void loop() {
  sensors.requestTemperatures();    // Ask DS18B20 to take temperature readings
  float tempC = sensors.getTempCByIndex(0); //Get temperature in Celcius

    //If no sensor found show warning
  if (tempC == DEVICE_DISCONNECTED_C) {
    Serial.println("DS18B20 not detected!");
    
    //Else print temperature value to serial monitor
  } else {
    Serial.print("DS18B20 Temperature: ");
    Serial.print(tempC);
    Serial.println(" °C");
  }

  delay(2000);  //Wait 2 seconds before repeating
}
