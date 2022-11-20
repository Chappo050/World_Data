module.exports = async (_: any, {input}: any, {models}: any) => {
    const newUser = await models.UserModel.create(input);
    return newUser;
}