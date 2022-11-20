import { ObjectId } from "mongoose"

module.exports = async (_:any, {userID}: any, {models}: any ) => {

  
    return await models.UserModel.findOne({_id: userID})
  }