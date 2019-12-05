# Blog

The back-end (server) for a simple blogging web application.

[Front-end (server) source code](https://github.com/ianbaxter/blog-app).

You will need a MongoDB account for database functionality. 

## Setup

Clone the project: 
```
git clone https://github.com/ianbaxter/my-blog-server
```

Navigate to the project directory:
```
cd my-blog-server
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

## Tasks:

  - enable login/user system functionality
