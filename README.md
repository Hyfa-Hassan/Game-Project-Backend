# Node.js Project with MongoDB, MySQL, and RabbitMQ

## Description

This project is a Node.js application that utilizes MongoDB for document storage, MySQL for relational data management, and RabbitMQ for message queuing.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**
- **npm** 
- **MongoDB** (installed and running)
- **MySQL Workbench** (installed and running)
- **RabbitMQ** (installed and running)

## Setting Up the Development Environment

Follow these steps to set up your development environment:

### 1. Clone the Repository

git clone https://github.com/yourusername/yourproject.git
cd yourproject

### 2. Install Dependencies

npm install

### 3. Configure MongoDB

Update your mongoDB connection string in .env file

### 3. Configure MySQL

CREATE DATABASE yourDatabaseName;

Create TABLE TABLENAME

Update your MySQL connection details in the .env file:
MYSQL_HOST=localhost
MYSQL_USER=yourUsername
MYSQL_PASSWORD=yourPassword
MYSQL_DATABASE=yourDatabaseName

### 4. Configure RabbitMQ

rabbitmq-server
RABBITMQ_URL=amqp://localhost


### 5. Running the Application

npm run start

### 6. Testing the Application

After starting the application, you can test the API endpoints using tools like Postman or cURL.