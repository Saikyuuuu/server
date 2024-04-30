const userModel = require("../models/User");

class UserController {
  static async getalluser(req, res) {
    var results = await userModel.getusers();

    if (results) res.send(results);
  }

  static async addnewuser(req, res) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var x = await userModel.adduser(name, lastname, email, password);
    if (x == true) res.send("add successfully");
    else res.send("add failed");
  }

  static async deleteuser(req, res) {
    const id = req.body.id;

    if (id) {
      var result = await userModel.deleteuser(id);
      if (result) res.send("delete done");
      else res.send("delete failed");
    }
  }

  static async updateuser(req, res) {
    const id = req.body.id;
    const newname = req.body.name;
    const newlastname = req.body.lastname;
    const newemail = req.body.email;
    const newpassword = req.body.password;

    var x = await userModel.edit(
      id,
      newname,
      newlastname,
      newemail,
      newpassword
    );
    if (x) res.send("update successfully");
    else {
      res.send("update failed");
    }
  }
}

module.exports = UserController;
