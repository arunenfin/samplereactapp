var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/sample.db');

var usersJSON = '[{"image":"avatar1.png","name":"Hardin Craft","email":"hardincraft@enomen.com","status":1},{"image":"avatar2.png","name":"Janette Berger","email":"janetteberger@enomen.com","status":1},{"image":"avatar3.png","name":"Lara Hendrix","email":"larahendrix@enomen.com","status":1},{"image":"avatar4.png","name":"Lilly Andrews","email":"lillyandrews@enomen.com","status":1},{"image":"avatar5.png","name":"Carmela Montgomery","email":"carmelamontgomery@enomen.com","status":1},{"image":"avatar6.png","name":"Huff Flores","email":"huffflores@enomen.com","status":1}]';
var usersObj = JSON.parse(usersJSON);

db.serialize(function () {
  console.log('Creating Admins table and entries...');

  db.run("CREATE TABLE Admins (name VARCHAR(50), email VARCHAR(50), password VARCHAR(50), status TINYINT)");

  db.run("INSERT INTO Admins VALUES (?, ?, ?, ?)", ["Admin", "admin@gmail.com", "12345", 1], function(err) {
    if(err) console.log(err)
  })

  db.each("SELECT rowid AS id, * FROM Admins", function (err, row) {
    console.log(row);
    console.log('Creating Users table and entries...');
  });


  db.run("CREATE TABLE Users (name VARCHAR(50), email VARCHAR(50), status TINYINT, image VARCHAR(50))");

  var stmt = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?)");
  for (var i = 0; i < usersObj.length; i++) {
    const { name, email, status, image } = usersObj[i];
    stmt.run(name, email, status, image);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, * FROM Users", function (err, row) {
    console.log(row);
  });
});

db.close();