# HBC Coffee Challenge | React NodeJS SQLite

> HBC Coffee Week Challenge with delivery via React front-end, served by NodeJS back-end and storage through SQLite database.

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
yarn
cd client
yarn
```

To start the server and client at the same time (from the root of the project)

```
yarn dev
```

Running the production build on localhost. This will create a production build, then Node will serve the app on http://localhost:5000

```
NODE_ENV=production yarn dev:server
```

## Deployment
App deployed on [heroku](https://wfung.herokuapp.com/).

-Wesley Fung