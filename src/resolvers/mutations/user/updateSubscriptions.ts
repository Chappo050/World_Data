module.exports = async (_: any, {userID, input}: any, {models}: any) => {
    const userToUpdate = await models.UserModel.findOne({_id: userID});

userToUpdate.subscribedCountries.push(input.newCountry)

    const updatedUser = await userToUpdate.save();

    return updatedUser;
}