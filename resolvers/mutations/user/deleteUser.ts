module.exports = async (_: any, {userID}: {userID: String}, {models}: any) => {
    const deleteUser = await models.UserModel.deleteOne({_id: userID});
    
    if(deleteUser.deletedCount) return{userID: userID}
}