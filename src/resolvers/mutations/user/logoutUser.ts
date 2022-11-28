
module.exports = async (_: any, {}, { user, res, models }: any) => {
  res.clearCookie("token");
  return {username: user.username}
};
