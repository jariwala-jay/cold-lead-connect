const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for sending emails
app.post('/send-email', async (req, res) => {
  const { emails, names ,message , subject } = req.body;

  // Split the emails string into an array of individual emails
  const emailList = emails.split(',').map(email => email.trim());
  const nameList = names.split(',').map(name => name.trim());

  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({  
    service: 'gmail',
    auth: {
        user: 'coldleadconnect@gmail.com', // Your SMTP username
        pass: 'xdjnqcwmsdkwarno' // Your SMTP password
      }
    });

      // Define email options
    let mailOptions = {
      from: 'coldleadconnect@gmail.com', // Sender address
      to: emailList, // Array of recipients
      subject: subject, // Subject line
      text: message  // Plain text body
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ success: false, message: 'Error occurred while sending email' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
