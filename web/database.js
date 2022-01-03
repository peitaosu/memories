var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var path = require('path');

const db_file = "calendar.db";
const db_dir = "db";

if (!fs.existsSync(db_dir)){
    fs.mkdirSync(db_dir);
}

let db = new sqlite3.Database(path.join(db_dir, db_file), (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // already created
            }else{
                // created
            }
        });  
    }
});

module.exports = db