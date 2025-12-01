const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function submitForm() {
    try {
        const form = new FormData();

        // Personal
        form.append('fullname', 'Final Test API');
        form.append('fatherName', 'Test Father API');
        form.append('dob', '2000-01-01');
        form.append('gender', 'Male');
        form.append('category', 'General');
        form.append('email', 'finaltestapi2@test.com');
        form.append('mobile', '9876543210');
        form.append('differentlyAbled', 'No');

        // Address
        form.append('permHouse', '123');
        form.append('permLine1', 'Test Street');
        form.append('permState', 'Delhi');
        form.append('permDistrict', 'New Delhi');
        form.append('permPincode', '110001');
        form.append('corrSame', 'true');
        form.append('corrHouse', '123');
        form.append('corrLine1', 'Test Street');
        form.append('corrState', 'Delhi');
        form.append('corrDistrict', 'New Delhi');
        form.append('corrPincode', '110001');

        // Education (JSON string)
        const eduList = [{
            qualification: '10th',
            course: 'All Subjects',
            stream: 'NA',
            board: 'CBSE',
            institute: 'Test School',
            passingYear: '2016',
            grade: '85',
            certificate: { type: 'file_upload' }
        }];
        form.append('educationList', JSON.stringify(eduList));

        // Experience & Skills
        form.append('experienceList', '[]');
        form.append('skills', JSON.stringify(['Communication']));

        // Files
        const dummyDocPath = path.join('C:\\Users\\yashs\\.gemini\\antigravity\\brain\\6c1a71ff-07fd-420d-aeaf-f2b5539a01dd', 'dummy_doc.pdf');
        const dummyImgPath = path.join('C:\\Users\\yashs\\.gemini\\antigravity\\brain\\6c1a71ff-07fd-420d-aeaf-f2b5539a01dd', 'dummy_image.jpg');

        if (fs.existsSync(dummyDocPath)) {
            form.append('certificates', fs.createReadStream(dummyDocPath));
        } else {
            console.log("Dummy doc not found, skipping certificate");
        }

        if (fs.existsSync(dummyImgPath)) {
            form.append('aadhar', fs.createReadStream(dummyImgPath));
            form.append('photo', fs.createReadStream(dummyImgPath));
        } else {
            console.log("Dummy image not found, skipping aadhar/photo");
        }

        console.log('Submitting form with files to local backend (5000)...');
        const response = await axios.post('http://localhost:5000/api/youth/register', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('✅ Submission Successful!');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('❌ Submission Failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

submitForm();
