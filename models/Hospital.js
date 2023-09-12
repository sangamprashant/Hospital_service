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
  imageType: Boolean,
  zip: String,
  phone: String,
  altphone: String,
  website: String,
  services: [String],
  specializations: [String],
  accreditations: [String],
  operatingHours: [
    {
      day: String,
      time: String
    }
  ],
  insuranceAccepted: [String],
  doctors: [
    {
      name: String,
      specialty: String
    }
  ],
  about: String,
  approved: Boolean,
  type: String,
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});

// Create a model for the hospital data using the schema
const Hospital = mongoose.model('HospitalServiceHospital', hospitalSchema);

// Export the Hospital model
module.exports = Hospital;
