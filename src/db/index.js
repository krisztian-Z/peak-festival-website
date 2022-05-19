const sqlite3 = require("sqlite3");
const path = require("path");

let db = null;
const connect = () =>
  new Promise((a) => {
    db = new sqlite3.Database( path.join(__dirname, "/music_festival.db"), (err) => {
      a();
    });
  });
const addUser = (user) =>
  new Promise((a) => {
    db.run(
      "INSERT INTO user(Fname, Lname,Email) VALUES(?, ?, ?)",
      [user.firstname, user.lastname, user.email],
      (err) => {
        a();
      }
    );
  });

const getUsers = () =>
  new Promise((a) => {
    db.all("select * from user;", (err, rows) => {
      a(rows);
    });
  });

module.exports = {
  connect: async () => {
    await connect();
  },
  addUser: async (user) => {
    await addUser(user);
  },
  getUsers: async () => {
    return await getUsers();
  },
};
