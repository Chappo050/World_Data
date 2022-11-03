const mongoose = require("mongoose");
const {Schema} = mongoose;

const HappyData = new Schema({
  Country: { type: String, required: true},
  Reigon: { type: String, trim: true },
  Happiness_Rank: { type: Number, required: true},
  Happiness_Score: { type: Number, required: true },
  Standard_Error: { type: Number },
  Lower_Confidence_Interval: { type: Number },
  Upper_Confidence_Interval: { type: Number },
  Whisker_high: { type: Number },
  Whisker_low: { type: Number },
  Economy_GDP_per_Capita: { type: Number, required: true },
  Family: { type: Number, required: true },
  Health_Life_Expectancy: { type: Number, required: true },
  Freedom: { type: Number, required: true },
  Trust_Government_Corruption: { type: Number, required: true },
  Generosity: { type: Number, required: true },
  Dystopia_Residual: { type: Number },
  Year: {type: Number},
});


//Export model
const CountryModel = mongoose.model("HappyData", HappyData);

export default CountryModel;