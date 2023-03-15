# Scribble Stadium API

Welcome to your `Scribble Stadium API`. Use this to start the project using nodejs, express and common industry standards.

This repository assumes a handful of industry practices and standards. We strive to keep you on the bleeding edge of the industry and as a result, we have made some opinions for you so that you don't have to; you're welcome.

## Key Collaborators

- [Ashalesh Tilawat](https://github.com/ashtilawat23)
- [Paul St.Germain](https://github.com/paulstgermain) 

## Tech Stack
- Node
- Express
- PostgreSQL
- Knex

## Getting Started

### Glossary of Scribble Stadium Terms

There is a glossary of standard terms that are to be used when discussing Scribble Stadium and when writing code available here - [Glossary](https://docs.google.com/document/d/1I2dtnjUtSmGxIfcuUWKrIRBhrCAFlmQ0RnJ3DZJIy4g/edit). Using the agreed upon terms will help developers to be understood and maintain consistency.

### Environment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DS_API_URL` - URL to a data science api. (eg. <https://ds-bw-test.herokuapp.com/>)
- `DS_API_TOKEN` - authorization header token for data science api (eg. SUPERSECRET)
- `DATABASE_URL` - connection string for postgres database using the knex url format
- `TEST_DATABASE_URL` - connection string for postgres test database using the knex url format
- `NODE_ENV` - The environment to use for knex scripts, should be development on local and production on live server
- `AWS_ACCESS_KEY_ID` - A special access key from AWS
- `AWS_SECRET_ACCESS_KEY` - A secret AWS access key that should not be shared with anyone
- `CI_DATABASE_URL` - the URL of the web-hosted database (I used [ElephantSQL](http://elephantsql.com)) that your CI tests are ran on. This must be set in order to use the `knex:ci` script in the `package.json` !
- `S3_BUCKET` - the name of the S3 bucket used for file storage
- `AUTH0_CLIENT_ID` - the Auth0 client id
- `AUTH0_DOMAIN` - the Auth0 domain
- `AUTH0_AUDIENCE` - the Auth0 audience

See .env.sample for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
   - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
   - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
   - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
     - if the database `api-dev` was not created then start over.
       > When using Docker, you will need to manually create your test database, called `api-test`
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
   - make note of the port, username and password you use to setup the database.
   - Connect your client to the server manually using the values previously mentioned
   - You will need to create a database manually using a client.
   - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
     > Make sure you create `api-dev` to run any queries in Postman or through the swagger documentation, as well as a database called `api-test` to run the Jest tests
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
   - Sign up for a free `Tiney Turtle` plan
   - copy the URL to the DATABASE_URL .env variable
   - make sure to add `?ssl=true` to the end of this url
     > you'll need separate databases for Jest testing (`api-test`) and Postman/Swagger endpoint testing (`api-dev`)

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.
