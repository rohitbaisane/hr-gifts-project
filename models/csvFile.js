const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const csvFileSchema = new Schema({
    owner: String,
    employeesList: [{ name: String, email: String, yearsOfExperience: String, address: String, department: String, birthDate: String }]
});

const csvFileModel = mongoose.model('csvFileSchema', csvFileSchema);
module.exports = csvFileModel;