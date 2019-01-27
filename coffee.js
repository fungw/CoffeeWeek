const coffeeUsersList = require('./coffeeUsers.json');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose();
const weekDate = require('./weekDate.js'); // ability to get week number of year
const _ = require('lodash');

const db = new sqlite3.Database('./coffeeUsers.db');
const sqlGetAllUsers = "SELECT * FROM USERSALL WHERE WEEKID='<%DATE%>'";
const sqlQueryWeekLocation = "SELECT * FROM USERS WHERE WEEKID='<%DATE%>'";
const sqlInsert = 'INSERT INTO USERS VALUES(?, ?, ?, ?);'
const sqlInsertAll = 'INSERT INTO USERSALL VALUES(?, ?);'

// coffee week partipating offices and locations
const PARTICIPANTS = [ { location: 'dub', department: 'engineering' }, { location: 'ny', department: 'engineering' }];

/**
 * constructDate()
 * - construct string displaying week of year and year
 * - format: WW-YYYY; e.g. 46-2018
 * - uses weekDate.js library
 */
constructDate = function() {
  const date = new Date();
  return date.getWeek() + '-' + date.getWeekYear();
}

fetchAllUsers = function(callback) {
  getUsers().then( allUsers => {
    callback && callback(allUsers.users);
  });
}

/**
 * fetchCoffeeList()
 * - check database for entries for this week
 * - if not, fetch from coffee users list JSON and populate database with coffee pairings
 * - else return coffee pairings from database
 */
fetchCoffeeList = function(callback) {
  let filteredCoffeePair;
  let dateWeek = constructDate();
  let sqlQuery = sqlQueryWeekLocation.replace('<%DATE%>', dateWeek);

  // query SQLite DB to check any entries for this week
  db.all(sqlQuery, async function(err, coffeePair) {
    // if there are no entries for this week
    if (coffeePair.length === 0) {
      new Promise(function(resolve, reject) {
        requestCoffeeUsers('', async function(users) {
          await insertUsersDB(users);
          resolve();
        });
      }).then(function() {
        _.each(PARTICIPANTS, function(office) {
          let queryString = '?location=' + office.location + '&department=' + office.department;
          requestCoffeeUsers(queryString, async function(users) {
            let usersClone = _.cloneDeep(users);
            let coffeeList = generateCoffeeList(usersClone);
            await insertCoffeeListDB(coffeeList);
            fetchCoffeeList(callback);
          });
        });
      });
    } else {
      getUsers().then( allUsers => {
        filteredCoffeePair = filterUsers(coffeePair, allUsers);
        callback && callback(filteredCoffeePair);
      });
    }
    if (err) console.log(err);
  });
}

fetchWeekDate = function(callback) {
  callback && callback(constructDate());
}

/**
 * filterUsers()
 * - given coffee pairing schema
 * - return user pairings with all relevant information of the users
 */
filterUsers = function(coffeePair, allUsers) {
  let filteredUser = [];
  const allUsersList = allUsers.users;
  let userMatch;
  _.each(coffeePair, function(pair) {
    userMatch = [];
    userMatch.push(findUser(allUsersList, pair['USER1']));
    userMatch.push(findUser(allUsersList, pair['USER2']));
    filteredUser.push(userMatch);
  });
  return filteredUser;
}

/**
 * findUser()
 * - find a user in a user list using their GUID
 */
findUser = function(allUsersList, singleUser) {
  return allUsersList.find(function(user) {
    return user.guid === singleUser;
  });
}

/**
 * generateCoffeeList()
 * - shuffle list of users
 * - and assign the coffee pairings
 */
generateCoffeeList = function(users) {
  users = users.users;
  shuffle(users);
  let results = [];
  for (let i=0; i<users.length; i++) {
    if (i === users.length-1) {
      results.push([users[users.length-1], users[0]]);
    } else {
      results.push(users.slice(i, i + 2));
    }
  }
  return results;
}

/**
 * getUsers()
 * - query SQLite database for all users
 */
getUsers = function() {
  return new Promise(function(resolve, reject) {
    let data;
    const dateWeek = constructDate();
    let sqlQuery = sqlGetAllUsers.replace('<%DATE%>', dateWeek);
    db.each(sqlQuery, (function(err, row) {
      data =  JSON.parse(row['USERLIST']);
      if (err) reject();
    }), function() {
      db.close;
      resolve(data);
    });
  });
}

insertCoffeeListDB = function(coffeeList) {
  return new Promise(function(resolve, reject) {
    const dateWeek = constructDate();
    for (let value of coffeeList) {
      if (value[0] && value[1]) {
        let queryParams = [ dateWeek, value[0].guid, value[1].guid, value[0].location ];
        db.run(sqlInsert, queryParams, function(err) {
          if (err) reject();
          console.log(`A row has been inserted into USERS with rowid ${this.lastID}`);
          resolve();
        });
      }
    }
  });
}

insertUsersDB = function(users) {
  return new Promise(function(resolve, reject) {
    const dateWeek = constructDate();
    let userStr = JSON.stringify(users);
    let queryParams = [ dateWeek, userStr ];
    db.run(sqlInsertAll, queryParams, function(err) {
      if (err) reject();
      console.log(`A row has been inserted with USERSALL rowid ${this.lastID}`);
      resolve();
    })
  });
}

/**
 * requestCoffeUsers()
 * - query API for users information
 */
requestCoffeeUsers = async function(query, callback) {
  return callback(coffeeUsersList);
}

/**
 * shuffle()
 * - shuffle the given array
 */
shuffle = function(arr) {
  let randomIdx, randomUser, i;
  for (i=arr.length-1; i>0; i--) {
      randomIdx = Math.floor(Math.random() * (i + 1));
      randomUser = arr[i];
      arr[i] = arr[randomIdx];
      arr[randomIdx] = randomUser;
  }
  return arr;
}

module.exports = {
  fetchAllUsers: fetchAllUsers,
  fetchCoffeeList: fetchCoffeeList,
  fetchWeekDate: fetchWeekDate
}