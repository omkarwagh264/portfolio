require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// POST route to handle contact form submissions
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the fields
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required!' });
  }

  try {
    // 1) Create the transporter using Yahoo SMTP details
    let transporter = nodemailer.createTransport({
      host: 'waghomkar71@gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,    // your Yahoo email address
        pass: process.env.PASSWORD, // your Yahoo email password or app password
      },
    });

    // 2) Define the mail options
    let mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL}>`, // sender address
      to: process.env.EMAIL, // your own Yahoo email to receive messages
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // 3) Send mail
    await transporter.sendMail(mailOptions);

    // If successful
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
