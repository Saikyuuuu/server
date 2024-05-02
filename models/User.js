const db = require("../config/db");
const { deleteuser } = require("../controllers/UserController");

class UserModel {
  static async getusers() {
    return new Promise((resolve) => {
      db.query("SELECT  * FROM users", [], (error, result) => {
        if (!error) resolve(result);
      });
    });
  }

  static async adduser(name, lastname, email, password) {
    return new Promise((resolve) => {
      db.query(
        "insert into users (name,lastname,email,password) values(?,?,?,?)",
        [name, lastname, email, password],
        (e, r) => {
          if (!e) resolve(true);
          else {
            console.log("error", e);
            resolve(false);
          }
        }
      );
    });
  }

  static async deleteuser(id) {
    return new Promise((resolve) => {
      db.query("delete from users where id=?", [id], (error, result) => {
        if (error) resolve(false);
        else resolve(true);
      });
    });
  }

  static async edit(id, name, lastname, email, password) {
    return new Promise((resolve) => {
      db.query(
        "update users set name=?, lastname=?, email=?, password=? where id=?",
        [name, lastname, email, password, id],
        (error, result) => {
          if (!error) resolve(true);
        }
      );
    });
  }

  static async login(email, password) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (error, result) => {
          if (!error && result.length > 0) {
            const user = result[0];
            resolve(user);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
}

module.exports = UserModel;
