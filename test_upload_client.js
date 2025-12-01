const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        const form = new FormData();
        const testFile = path.join('C:\\Users\\yashs\\.gemini\\antigravity\\brain\\6c1a71ff-07fd-420d-aeaf-f2b5539a01dd', 'dummy_image.jpg');

        if (fs.existsSync(testFile)) {
            form.append('testfile', fs.createReadStream(testFile));
            console.log("Uploading file to test server on port 5001...");

            const response = await axios.post('http://localhost:5001/test-upload', form, {
                headers: {
                    ...form.getHeaders()
                }
            });

            console.log("✅ Upload Success!");
            console.log("Response:", JSON.stringify(response.data, null, 2));
        } else {
            console.log("❌ Test file not found");
        }
    } catch (error) {
        console.error("❌ Upload Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Error:", error.message);
        }
    }
}

testUpload();
