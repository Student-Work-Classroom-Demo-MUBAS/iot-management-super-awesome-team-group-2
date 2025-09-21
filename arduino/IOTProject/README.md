# IOT Greenhouse Monitoring

## Project Goal
This project collects environmental data (soil mosture, humidity, and temperature) using an ESP32-C3 Mini and sensors. The data will later be extended for Iot applications

## Hardware
-ESP32-C3 Mini 1
-DHT11 (humidity)
-DS18B20(temperature)
-Capacitive Soil Moisture Sensor

## Pin Setup
-DHT11 : GPIO 5
-DS18B20 : GPIO 4
-Soi Moisture Sensor: GPIO 2

## Libraries
-DHT sensor library
-Adafruit unified sensor
-DallasTemperature
-OneWire

## How to run
-Open the .ino file in Arduino IDE
-Install the libraries above
-Select ESP32C3 Dev Module in Tools > Board
-Upload and open Serial Monitor at 115200 baud
