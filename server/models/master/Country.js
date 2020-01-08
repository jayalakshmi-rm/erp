/*
// Created by Academy on 20/10/16
// Model file for Country
// Fields to be captured
// name: String 
// activeStatus: boolean
// createdOn: Date
// updatedOn: Date
// All fields are mandatory
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Define the CountrySchema Here
var CountrySchema = Schema({
    name:{type:String,required:true,unique:true},
    activeStatus: {type: Boolean, required:true},
    createdOn: {type: Date, required: true},
    updatedOn: {type: Date, required: true}
});

module.exports = mongoose.model('Country', CountrySchema);