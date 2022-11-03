var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var WorldHappinessSchema = new Schema({
    Country: { type: String, required: true, trim: true },
    Reigon: { type: String, trim: true },
    "Happiness Rank": { type: Number, required: true, trim: true },
    "Happiness Score": { type: Number, required: true },
    "Standard Error": { type: Number },
    "Lower Confidence Interval": { type: Number },
    "Upper Confidence Interval": { type: Number },
    "Whisker high": { type: Number },
    "Whisker low": { type: Number },
    "Economy (GDP per Capita)": { type: Number, required: true },
    Family: { type: Number, required: true },
    "Health (Life Expectancy)": { type: Number, required: true },
    Freedom: { type: Number, required: true },
    "Trust (Government Corruption)": { type: Number, required: true },
    Generosity: { type: Number, required: true },
    "Dystopia Residual": { type: Number }
});
//Export model
var Countryg = mongoose.model("WorldHappiness", WorldHappinessSchema);
module.exports = { Countryg: Countryg };
