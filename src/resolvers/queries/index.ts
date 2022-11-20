//Country Queries
const getAllCountries = require('./country/countries');
const getCountryData = require('./country/country');
const getCountryYearData = require('./country/countryByNameYear');
const getCountryAllYearData = require('./country/countryByNameAllYear');

//User Queries
const getAllUsers= require('./user/allUsers')
const getUserInfo = require('./user/userInfo')

module.exports = { getAllCountries, getCountryData, getCountryYearData, getCountryAllYearData, getAllUsers, getUserInfo }