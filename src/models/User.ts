const mongoose = require("mongoose");
const {Schema} = mongoose;

const User = new Schema({
  id: String,
  username: String,
  email: String,
  password: String,
  subscribedCountries: [String],
});


//Export model
const UserModel = mongoose.model("User", User);

export default UserModel;