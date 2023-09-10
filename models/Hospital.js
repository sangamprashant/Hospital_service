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
  address: String,
  image: String,
  zip: String,
  phone: String,
  website: String,
  services: [String],
  specializations: [String],
  accreditations: [String],
  operatingHours: {
    type: Object
  },
  insuranceAccepted: [String],
  doctors: [
    {
      doctorImage: String,
      name: String,
      specialty: String
    }
  ],
  aboutUs: String,
  approved: Boolean,
  type: String,
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});

// Create a model for the hospital data using the schema
const Hospital = mongoose.model('HospitalServiceHospital', hospitalSchema);

// Export the Hospital model
module.exports = Hospital;
