module.exports = async (_: any, {userID, input}: any, {models}: any) => {
    const userToUpdate = await models.UserModel.findOne({_id: userID});

userToUpdate.subscribedCountriesCode.push(input.newCountryCode)
userToUpdate.subscribedCountriesName.push(input.newCountryName)

    const updatedUser = await userToUpdate.save();

    return updatedUser;
}