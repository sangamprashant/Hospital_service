const mongoose = require('mongoose');

// Define a schema for hospital data
const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: String,
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});

// Create a model for the hospital data using the schema
const Admin = mongoose.model('HospitalServiceAdmin', hospitalSchema);

// Export the Hospital model
module.exports = Admin;
