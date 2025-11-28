const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Personal
    fullname: String,
    fatherName: String,
    dob: String,
    gender: String,
    category: String,
    differentlyAbled: String,
    email: String,
    mobile: String,
    alternativeMobile: String,

    // Address
    permAddress: String,
    permDistrict: String,
    permState: String,
    permPincode: String,
    corrAddress: String,
    corrDistrict: String,
    corrState: String,
    corrPincode: String,

    // Education
    educationList: [
      {
        qualification: String,
        course: String,
        stream: String,
        board: String,
        institute: String,
        passingYear: String,
        marksType: String,
        score: String,
        certificate: Object // { name, type, size, data (base64) }
      }
    ],

    // Skills
    skills: [String],

    // Documents
    documents: {
      aadhar: Object, // { name, type, size, data }
      photo: Object   // { name, type, size, data }
    },

    // Experience
    experienceList: [
      {
        company: String,
        role: String,
        duration: String,
        description: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
