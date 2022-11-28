const jwt = require('jsonwebtoken');
export const decodedToken = (req:any, requireAuth = true) => {
    const token = req.cookies["token"] || null;
    
  if (token){
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  }
  if (requireAuth) {
    throw new Error('Login in to access resource');
  } 
  return null
}
module.exports = { decodedToken }