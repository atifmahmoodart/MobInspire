const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: 'sareaamrwp@gmail.com',
    pass: 'YOUR_APP_KEY',
  },
});

const sendOTPToEmail = (recipientEmail, otp) => {
  const mailOptions = {
    from: 'sareaamrwp@gmail.com', 
    to: recipientEmail,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendOTPToEmail };
