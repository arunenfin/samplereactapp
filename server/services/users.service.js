const db = require('./db');

module.exports.getUsers = (params) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT rowid AS id, * FROM Users", (err, rows) => {
      if(err) { return reject() }
      resolve(rows);
    })
  })
}

module.exports.getUserById = (params) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT rowid AS id, * FROM Users WHERE rowid = ?", [params.id], (err, row) => {
      if(err || !row) { return reject(); }

      resolve(row);
    })
  })
}

module.exports.updateUserById = (params) => {
  return new Promise((resolve, reject) => {
    let keys = [];
    let values = [];

    for(let x in params) {
      if(x !== 'id') {
        keys.push(`${x} = ?`);
        values.push(params[x]);
      }
    }
    values.push(params.id);

    db.run(`UPDATE Users SET ${keys.join(', ')} WHERE rowid = ?`, values, (err) => {
      if(err) { return reject(); }

      resolve();
    });
  })
}