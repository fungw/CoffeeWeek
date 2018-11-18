const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const coffee = require('./coffee.js');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/fetchCoffeeList', (req, res) => {
  coffee.fetchCoffeeList(function(data) {
    return res.send({ coffeeUserList: data });
  })
});

app.get('/api/fetchAllUsers', (req, res) => {
  coffee.fetchAllUsers(function(data) {
    return res.send({ allUsers: data });
  })
});

app.get('/api/fetchWeekDate', (req, res) => {
  coffee.fetchWeekDate(function(data) {
    return res.send({ weekDate: data });
  })
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  coffee.fetchCoffeeList();
});