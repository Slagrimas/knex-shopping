const express = require('express');
const db = require('../knex/knex');
const router = express.Router();
knex = require('../knex/knex.js')

router.get('/', (req, res) => {
  res.json('WELCOME TO USERS')
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log("id:", { id });
  knex.raw('SELECT * FROM users WHERE id = ?', [id])
    .then(results => {
      console.log("user results:", results.rows);
      res.json(results.rows[0])
    })
    .catch(err => {
      console.log('User not found', err);
    })
});

router.post('/login', (req, res) => {
  const data = req.body;
  return knex.raw('SELECT email, password FROM users WHERE email = ?', [data.email])
    .then(user => {
      if (!user || !user.rowCount) {
        return res.status(400).json({ "message": "User not found" })
      }
      return user;
    })
    .then(user => {
      if (user.rows[0].password !== data.password) {
        return res.status(400).json({ "message": "Incorrect password" })
      }
      return user;
    })
    .then(user => {
      res.json(user.rows[0]);
    })
    .catch(err => {
      res.send('there was an error');
    })
})

router.post('/register', (req, res) => {
  const data = req.body;
  return knex.raw('SELECT email FROM users WHERE email = ?', [data.email])
    .then(result => {
      if (result && result.rowCount < 1) {
        console.log('READY TO INSERT')
        return knex.raw('INSERT INTO users (email, password) VALUES (?, ?) RETURNING *', [data.email, data.password])
      } else {
        return res.status(400).json({ "message": "User already exists" });
      }

    })
    .then(newUser => {
      return res.json(newUser.rows);
    })
    .catch(err => {
      console.log(err);
      res.send('there was an error');
    })
})


module.exports = router;