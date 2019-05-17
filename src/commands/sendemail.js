#!/usr/bin/env node
const nodemailer = require("nodemailer");
const keys = require("../keys");

// function to send mail
const sendmail = (to, subject) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "mail.yahoo.com",
    port: 587,
    secure: false,
    auth: {
      user: keys.email, // Joke Bot Email
      pass: keys.password // Joke Bot Password
    }
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: `${keys.email}, <foo@example.com>`, // sender address
    to,
    subject,
    text: "Hello world?",
    html: "<b>Hello world?</b>" // html body
  });
};

module.exports = {
  sendmail
};
