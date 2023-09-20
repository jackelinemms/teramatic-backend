import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

const login = (req, res) => {
  console.log(req.body);
  try {
    UserSchema.findOne({ email: req.body.email }, (error, user) => {
      if (!user) {
        return res.status(401).send({
          message: "User não encontrado",
          email: `${req.body.email}`,
        });
      }

      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).send({
          message: "Login não autorizado",
        });
      }

      const token = jwt.sign({ name: user.name }, SECRET);

      res.status(200).send({
        message: "Login autorizado",
        token,
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export default login;
