import {decodedToken} from '../../../authenticate';
module.exports = async (_:any, {userID}: any, {user,models}: any ) => {

  
    return await models.UserModel.findOne({username: user})
  }