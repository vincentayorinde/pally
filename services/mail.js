import * as dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'vincent@bitnob.com', // Change to your recipient
  from: 'vincent@vincenttechblog.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then((data) => {
    console.log('the data', data);
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })