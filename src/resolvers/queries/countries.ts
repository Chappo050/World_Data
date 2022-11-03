
module.exports = async (_:any, {}, {models}: any ) => {

  
  return await models.CountryModel.find()
}