module.exports = async (_: any, {input}: any, {user, models}: any) => {
    const userToUpdate = await models.UserModel.findOne({username: user.username});

    Object.keys(input).forEach(value => {
        userToUpdate[value] = input[value]
    })

    const updatedUser = await userToUpdate.save();

    return updatedUser;
}