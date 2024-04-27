import formData from './components/ContactForm/index.js'

// Import the nodemailer module


const send =() =>{
const nodemailer = require('nodemailer');


// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coldleadconnect@gmail.com', // Your email address
        pass: 'xdjnqcwmsdkwarno' // Your email password
    }
});

// Define email options
let mailOptions = {
    from: 'coldleadconnect@gmail.com', // Your email address
    to: ['jayjariwala24@gmail.com'], // Array of recipients
    subject: 'Test Email', // Subject line
    text: 'This is a test email sent using nodemailer.' // Plain text body
};

// Send email

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    
}
send()