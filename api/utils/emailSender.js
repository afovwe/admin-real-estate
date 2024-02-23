// utils/emailSender.js

import nodemailer from 'nodemailer';
import crypto from 'crypto';


// Send mail function
export const sendVerificationEmail = (toEmail, verificationCode, action) => {

  let message = '';
  if (action === 'signup') {
    message = `<p>Congratulations! Your Realtor Express Squad Account has been created!</p>
              <p>Please use this code to verify your email address.</p>`;
  } else if (action === 'generate') {
    message =  `<p>See Your New verification code: </p>`;
  } else if (action === 'regenerate') {
    message =  `<p>See Your Newly regenerated verification code: </p>`;
  }
  // Calculate the activation link
  const encodedEmail = encodeURIComponent(toEmail);
  const encodedverificationCode = encodeURIComponent(verificationCode)  
  const activationLink = `https://realtor-express-ed778a93d1ca.herokuapp.com/verify-by-link?email=${encodedEmail}&verificationCode=${encodedverificationCode}`;

  // Create a transporter using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'realtorexpressakpadaka@gmail.com',
      pass: 'teuhqhkhgtnqiezl'
    }
  });

  const mailOptions = {
    from: 'realtorexpressakpadaka.com',
    to: toEmail,
    subject: 'Realtor Express Squad Verification Code',
    html: `
      <html>
      <head>
        <style>
          /* Your CSS styles */
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verify Your Realtor Express Squad Email</h1>
          <p>${message}</p>       
          <p>click the link below:</p>
          <p><a href="${activationLink}">Activate Account Now</a></p>
          <p>Or, if you cannot see a link, copy and paste the following URL into your web browser's URL bar:</p>
          <p>${activationLink}</p>
          <p>Please email us at support@realtorexpressakpadaka.com if you have any questions.</p>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};
