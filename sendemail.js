const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.sendGrid_api_key)
const sendEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'missoumxss@gmail.com',
        subject: 'Thanks for signing up!',
        text: `welcome to our app, ${name}!`
      })
}

module.exports = sendEmail


