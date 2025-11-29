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

    // Permanent Address
    permHouse: String,
    permLine1: String,
    permLine2: String,
    permState: String,
    permDistrict: String,
    permBlock: String,
    permVillage: String,
    permPincode: String,

    // Correspondence Address
    corrSame: Boolean,
    corrHouse: String,
    corrLine1: String,
    corrLine2: String,
    corrState: String,
    corrDistrict: String,
    corrBlock: String,
    corrVillage: String,
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
      aadhar: { url: String, name: String },
      photo: { url: String, name: String }
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
