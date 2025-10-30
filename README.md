## Project Overview
This project is an *IoT data management solution* for greenhouse sensor monitoring and analytics. It collects data from ESP32-based sensor devices, stores readings in a PostgreSQL database via a Node.js/Express backend, and provides a live dashboard web interface with real-time updates, hourly averages, and historical data visualization.

## Setup Instructions
Prerequisites
Node.js v18+ installed
PostgreSQL database server (or MySQL, as configured)
ESP32 firmware and device(s) set up to POST sensor data
Git for cloning the repository

## Clone and Install
git clone https://github.com/yourusername/chamama-iot-dashboard.git
cd chamama-iot-dashboard
npm install

## Environment Variables

Create a .env file in the project root. Example (do not commit your actual passwords):
DB_USER=db_user
DB_PASS=db_pass
DB_NAME=db_name
DB_HOST=localhost
JWT_SECRET=jwt_secret

## Database Setup
Initialize PostgreSQL

## Running the Backend/Frontend
npm start
Server runs on http://localhost:3000 by default.

## Connecting ESP32 Devices
Flash provided ESP32 firmware (/iot-device/ directory)
Configure endpoint 

## Viewing The Dashboard
Open http://localhost:3000 in your browser for the live dashboard
Swagger documentation is available at http://localhost:3000/api-docs

## Database Schema
<img width="1293" height="778" alt="Screenshot 2025-10-30 212215" src="https://github.com/user-attachments/assets/747679c2-99b7-41c2-ab3d-6acb7101d1dd" />

## User Manual
## Viewing Live Dashboard
Open Dashboard
Visit http://localhost:3000

<img width="1919" height="900" alt="image" src="https://github.com/user-attachments/assets/6b39caac-5dd6-4dab-a1ab-96a30abcc5b8" />
Card displays current temperature, humidity, and soil moisture for the greenhouse.

![WhatsApp Image 2025-10-30 at 21 33 29_9c73f6bf](https://github.com/user-attachments/assets/30a0d3bb-0aaf-4234-aeee-11ccef0355c1)
IoT device POSTs data at intervals.
API endpoints are described and testable in Swagger.

## API Endpoints
All requests expect/return JSON unless otherwise specified.

![WhatsApp Image 2025-10-30 at 21 37 24_9aa999d0](https://github.com/user-attachments/assets/f7b29703-1f33-4e00-872d-4d1ed395f2d6)

## Architecture diagram

The Chamama IoT Data Management System follows the Model-View-Controller (MVC) architectural pattern, which separates the application into three interconnected components to improve modularity and maintainability.

Model: Manages the data and database operations for sensor readings, devices, and users.

View: Provides the user interface through EJS templates and frontend JavaScript, displaying live and historical sensor data.

Controller: Handles user requests and device data submissions via Express API routes, processes business logic, and communicates between Model and View.

<img width="1536" height="1024" alt="architecture" src="https://github.com/user-attachments/assets/d36db35a-4537-4206-921e-08715a895694" />


