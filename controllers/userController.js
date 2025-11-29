const User = require("../models/User");

exports.saveUser = async (req, res) => {
    try {
        console.log("Received Body:", req.body);
        console.log("Received Files:", req.files);

        const userData = req.body;

        // Parse JSON strings if coming from FormData
        try {
            if (typeof userData.educationList === 'string') userData.educationList = JSON.parse(userData.educationList);
            if (typeof userData.experienceList === 'string') userData.experienceList = JSON.parse(userData.experienceList);
            if (typeof userData.skills === 'string') userData.skills = JSON.parse(userData.skills);
            if (typeof userData.documents === 'string') userData.documents = JSON.parse(userData.documents);
        } catch (e) {
            console.error("JSON Parse Error:", e);
        }

        // Handle uploaded files (Cloudinary URLs)
        if (req.files) {
            // Aadhar
            if (req.files.aadhar) {
                userData.documents = userData.documents || {};
                userData.documents.aadhar = {
                    url: req.files.aadhar[0].path,
                    name: req.files.aadhar[0].originalname
                };
            }
            // Photo
            if (req.files.photo) {
                userData.documents = userData.documents || {};
                userData.documents.photo = {
                    url: req.files.photo[0].path,
                    name: req.files.photo[0].originalname
                };
            }

            // Map certificates to educationList
            if (req.files.certificates && userData.educationList) {
                let certIndex = 0;
                userData.educationList = userData.educationList.map(edu => {
                    if (edu.certificate && edu.certificate.type === 'file_upload') {
                        if (req.files.certificates[certIndex]) {
                            const file = req.files.certificates[certIndex];
                            certIndex++;
                            return {
                                ...edu,
                                certificate: {
                                    url: file.path,
                                    name: file.originalname
                                }
                            };
                        }
                    }
                    return edu;
                });
            }
        }

        const user = new User(userData);
        await user.save();
        res.json({
            success: true,
            message: "User saved successfully!",
            user,
            debug: {
                filesReceived: req.files ? Object.keys(req.files) : [],
                bodyKeys: Object.keys(req.body)
            }
        });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Error saving user", details: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};
