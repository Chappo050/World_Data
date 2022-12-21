
module.exports = async (_:any, {countryName, year}: {countryName: String, year:Number}, {models}: any ) => {

  
    return await models.CountryModel.findOne({Country: countryName, Year: year})
  }