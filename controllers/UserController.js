const userModel = require("../models/User");
const bcrypt = require("bcrypt");

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

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      // Add the user with hashed password
      var x = await userModel.adduser(name, lastname, email, hashedPassword);

      if (x == true) {
        res.send("Add successful");
      } else {
        res.send("Add failed");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
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

    if (!id) {
      res.status(400).send("Id Required");
      return;
    }

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

  static async loginuser(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    try {
      const user = await userModel.login(email);
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Incorrect password
        return res.status(401).send("Incorrect password");
      }

      res.send("Login successful");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = UserController;
