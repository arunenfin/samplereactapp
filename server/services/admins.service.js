const db = require('./db');
const jwt = require('jsonwebtoken');

const JWTSECRET = process.env.JWTSECRET;

module.exports.authenticate = (params) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT rowid AS id, name FROM Admins WHERE email = ? AND password = ?", [params.email, params.password], (err, row) => {
      if(err || !row) { return reject(); }

      const { id, name } = row;
      const token = jwt.sign({ id, name }, JWTSECRET);

      resolve(token);
    })
  })
}