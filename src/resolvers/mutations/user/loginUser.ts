import bcrypt from 'bcryptjs';
import {ApolloError} from "apollo-server-errors";
const jwt = require('jsonwebtoken');


const { sign, verify } = jwt;
module.exports = async (_: any, { input }: any, { models }: any) => {
  let user: any;
  models.UserModel.findOne({ username: input.username }).exec(
    async (err: Error, userFound: any) => {
      if (err) {
        return err;
      }
      if (!userFound) {
    
        throw new ApolloError(
          "Username cannot be found",
          "USER_DOES_NOT_EXIST"
        );
      } else {
        //Check password matches encrypted password
        if (await bcrypt.compare(input.password, userFound.password)) {
            
          //Create new token
          const token = jwt.sign(
            
            {username: input.username },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );

          userFound.token = token
          console.log(userFound);
          return userFound
          
        }


        else {
            //Incorrect password
            throw new ApolloError(
                "Incorrect Password",
                "WRONG_PASSWORD"
              );
        }
      }
    }
  );


};
