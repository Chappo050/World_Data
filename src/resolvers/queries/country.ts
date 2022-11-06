
module.exports = async (_:any, {countryName}:any, {models}: any ) => {

  
  return await models.CountryModel.find({Country: countryName})
}