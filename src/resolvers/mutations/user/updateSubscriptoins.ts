module.exports = async (_: any, {userID, input}: any, {models}: any) => {
    const userToUpdate = await models.UserModel.findOne({_id: userID});

    Object.keys(input).forEach(value => {
        userToUpdate[value] = input[value]
    })

    const updatedUser = await userToUpdate.save();

    return updatedUser;
}