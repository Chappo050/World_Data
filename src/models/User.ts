const mongoose = require("mongoose");
const {Schema} = mongoose;

const User = new Schema({
  id: String,
  username: { type:String, unique: true},
  email: { type:String, unique: true},
  password: String,
  subscribedCountriesCode: [String],
  subscribedCountriesName: [String],
  token: {type: String},
});


//Export model
const UserModel = mongoose.model("User", User);

export default UserModel;