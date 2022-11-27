import { ObjectId } from "mongoose"

module.exports = async (_:any, {userID}: any, {token,models}: any ) => {

  console.log(token); 
  
    return await models.UserModel.findOne({username: userID})
  }