module.exports = async (_:any, {}, {res,user,models}: any ) => {
  
    return await models.UserModel.findOne({username: user.username})
  }