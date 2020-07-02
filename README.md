# Poetical

The back-end (server) for an application for collaborating on creative prose.

[Front-end (server) source code](https://github.com/ianbaxter/poetical).

## Setup

You will need a MongoDB account for database functionality.

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

Create a .env file (just called .env) in the project directory and inside the .env file create a environemnt variable called DB_CONNECT which will be equal to your MongoDB connection string.

Details on how to get your connection string and connect to a MongoDB database via driver can be found [here](https://docs.atlas.mongodb.com/driver-connection/).

To start up the server:

```
npm start
```

The server will then be running on port 8000.

## Deploy

I have deployed my version of this project to Heroku however you can deploy to other platforms.
