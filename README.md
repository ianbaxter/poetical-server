# Poetical

The back-end API for poetical, an application for collaborating on creative writing.

Built using the MERN stack (MongoDB, Express, Node.js & React). The back-end is hosted on Google's App Engine.

[Front-end (server) source code](https://github.com/ianbaxter/poetical).

## Setup

Clone the project:

```
git clone https://github.com/ianbaxter/poetical-server
```

Navigate to the project directory:

```
cd poetical-server
```

Install dependencies:

```
npm install
```

I used MongoDB for the database.

Create a .env file in the project directory. inside the .env file create a environemnt variable called DB_CONNECT which will be equal to your MongoDB connection string.

Details on how to get your connection string and connect to a MongoDB database via driver can be found [here](https://docs.atlas.mongodb.com/driver-connection/).

To start up the server:

```
npm start
```

The server will then be running on port 8000.

## Deploy

I have used Google's App Engine to host this.
