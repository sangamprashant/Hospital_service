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
      const token = jwt.sign({ hospitalId: hospital._id }, 'your-secret-key');
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
router.get('/api/hospital/:id', async (req, res) => {
  const {id}= req.params;
  try {
      const hospital = await Hospital.findOne({_id:id});
      res.status(200).json({
          details:hospital,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});
router.put('/api/hospital/:hospitalId', async (req, res) => {
  const hospitalId = req.params.hospitalId;
  const updatedData = req.body;

  try {
    // Find the hospital by ID and update its data
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedHospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    // Respond with the updated hospital data
    res.status(200).json({ success: true, updatedHospital });
  } catch (error) {
    console.error('Error while updating hospital data:', error);
    res.status(500).json({ error: 'Failed to update hospital data' });
  }
});

router.post('/api/hospital/searched/public', async (req, res) => {
  const { name, address } = req.body;

  // Define your search criteria
  let searchCriteria = {
    approved: true,
  };

  if (name) {
    // Use a regular expression to match partially or by initials
    const nameRegex = new RegExp(`^${name}`, 'i'); // 'i' for case-insensitive
    searchCriteria.name = nameRegex;
  }

  if (address) {
    // Use a regular expression to match partially or by initials
    const nameRegex = new RegExp(`^${address}`, 'i'); // 'i' for case-insensitive
    searchCriteria.address = nameRegex;
  }

  try {
    const hospitals = await Hospital.find(searchCriteria);
    res.status(200).json({details:hospitals,});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});
router.put('/api/hospital/approve/:hospitalId', async (req, res) => {
  const hospitalId = req.params.hospitalId;

  try {
    // Find the hospital by its ID
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Update the approved status
    hospital.approved = !hospital.approved; // Toggle the approval status

    // Save the updated hospital
    await hospital.save();

    res.status(200).json({ message: 'Hospital approval status updated successfully', hospital });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});
// DELETE a hospital by ID
router.delete('/api/hospitals/delete/:id', async (req, res) => {
  const hospitalId = req.params.id;

  try {
    // Find the hospital by ID and remove it from the database
    const deletedHospital = await Hospital.findByIdAndRemove(hospitalId);

    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// GET the count of hospitals with approved set to true and false
router.get('/api/hospitals/count', async (req, res) => {
  try {
    const countApproved = await Hospital.countDocuments({ approved: true });
    const countNotApproved = await Hospital.countDocuments({ approved: false });
    const countHospital = await Hospital.countDocuments({ });
    res.status(200).json({ countApproved, countNotApproved, countHospital });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;