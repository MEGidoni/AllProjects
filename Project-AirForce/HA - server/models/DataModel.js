const mongoose = require('mongoose');
const joi = require('joi');

const dataSchema = new mongoose.Schema({
    Altitude: Number,
    HIS: Number,
    ADI: Number
},
    { timestamps: true } ,
)
exports.DataModel = mongoose.model("AirForceRequests", dataSchema);

exports.validData = (_reqbody) => {
    const joischema = joi.object({
        Altitude: joi.number().min(0).max(3000).required(),
        HIS: joi.number().min(0).max(360).required(),
        ADI: joi.number().min(0).max(100).required()
    })
    return joischema.validate(_reqbody);
}