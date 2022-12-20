module.exports = async (_: any, { user, input }: any, { models }: any) => {
  const userToUpdate = await models.UserModel.findOne({
    username: user.username,
  });

  userToUpdate.subscribedCountriesCode.push(input.newCountryCode);
  userToUpdate.subscribedCountriesName.push(input.newCountryName);

  const updatedUser = await userToUpdate.save();

  return updatedUser;
};
