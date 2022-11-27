import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server-errors";
const jwt = require("jsonwebtoken");

const { sign, verify } = jwt;
module.exports = async (_: any, { input }: any, {res, models }: any) => {
  return new Promise<void>((resolve, reject) => {
    let user: any;
    models.UserModel.findOne({ username: input.username }).exec(
      async (err: Error, userFound: any) => {
        if (err) {
          reject(err);
        }
        if (!userFound) {
          return reject(
            new ApolloError("Username cannot be found", "USER_DOES_NOT_EXIST")
          );
        } else {
          //Check password matches encrypted password
          if (await bcrypt.compare(input.password, userFound.password)) {
            //Create new token
            const token = jwt.sign(
              { username: input.username },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "2h",
              }
            );

            userFound.token = token;
            console.log(userFound);
            res.cookie('token', token)
            resolve(userFound);
          } else {
            //Incorrect password
            return reject(
              new ApolloError("Incorrect Password", "WRONG_PASSWORD")
            );
          }
        }
      }
    );
  });
};
