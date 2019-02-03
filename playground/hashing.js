const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    // console.log(hash);
  });
});

var hashedPassword = '$2a$10$ww2ic.dFE8YEOVJaI8hHt.Yc.tKQKhlcOQ1aZRjJFPht4hBFXAIfG';

bcrypt.compare('password', hashedPassword, (err, res) => {
  console.log(res);
});