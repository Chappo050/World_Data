
const createUser = require('./user/createUser');
const deleteUser = require('./user/deleteUser');
const updateUserInfo = require('./user/updateUserInfo');
const updateSubscriptions = require('./user/updateSubscriptions')
const loginUser = require('./user/loginUser')
const logoutUser = require('./user/logoutUser')

module.exports = { createUser, deleteUser, updateUserInfo, updateSubscriptions, loginUser, logoutUser }