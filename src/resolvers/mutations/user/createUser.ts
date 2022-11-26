import bcrypt from 'bcryptjs';
import {ApolloError} from "apollo-server-errors";
const jwt = require('jsonwebtoken');

module.exports = async (_: any, {input}: any, {models}: any) => {
    let newUser: any
    models.UserModel.findOne({username: input.username}).exec (
        async (err: Error, userFound: any) => {
            if (err) {
                return (err)
            }
         if (userFound) {
            throw new ApolloError("Username already exists", "USER_ALREADY_EXISTS" )
         }
         else {
            //Hash password
            const hashedPassword = await bcrypt.hash(input.password, 10); 
           

            //Create our JWT
            const token = jwt.sign(
                {username: input.username},
                process.env.TOKEN_SECRET, {
                    expiresIn: "2h"
                }
            )

           return await models.UserModel.create({username: input.username, email:input.email.toLowerCase(), password: hashedPassword, token: token})
      
        

         
            
         }
        }
    )

    console.log(newUser);
    
return newUser
   
}