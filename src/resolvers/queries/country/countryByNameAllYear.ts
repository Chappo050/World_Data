
module.exports = async (_:any, {countryName}: {countryName: String, year:Number}, {models}: any ) => {

  
    return await models.CountryModel.find({Country: countryName})
  }