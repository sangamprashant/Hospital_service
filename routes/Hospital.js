const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Hospital = mongoose.model("HospitalServiceHospital");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// POST route to insert hospital data
router.post("/api/register-hospital", async (req, res) => {
    try {
        const { email, name, phone, address, zip, password } = req.body;
        // Check if the email is already registered
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({ message: 'Email already registered.' });
        }
        // Hash and salt the password
        const saltRounds = 10; // Number of salt rounds, higher is more secure
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create a new Hospital instance
        const hospital = new Hospital({email, name, phone, address, zip, password:hashedPassword, approved:false, type:"hospital" });
        // Save the hospital data to the database
        await hospital.save();
        res.status(200).json({ message: "Hospital data inserted successfully" });
    } catch (error) {
      console.error("Error inserting hospital data:", error);
      res.status(500).json({ error: "Failed to insert hospital data" });
    }
  });
  // Login route
router.post('/api/hospital/do/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the admin by email
      const hospital = await Hospital.findOne({ email });
      // If the admin does not exist, return an error
      if (!hospital) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      if (!hospital.approved) {
        return res.status(401).json({ error: "Please wait you can't login as your application is in review.." });
      }
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, hospital.password);
      // If the password is invalid, return an error
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed passw' });
      }
      // Create a JWT token with the admin's ID as the payload
      const token = jwt.sign({ adminId: hospital._id }, 'your-secret-key');
      // Send the token and admin details as a response
      res.status(200).json({
        message: 'Login successful',
        token: token,
        details:hospital,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.get('/api/hospitals/approved', async (req, res) => {
    try {
        const hospital = await Hospital.find({approved:true});
        res.status(200).json({
            message: 'Fetched all hospitals',
            details:hospital,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/api/hospitals/application', async (req, res) => {
  try {
      const hospital = await Hospital.find({approved:false});
      res.status(200).json({
          message: 'Fetched all hospitals',
          details:hospital,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;