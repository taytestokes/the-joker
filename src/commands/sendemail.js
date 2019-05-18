#!/usr/bin/env node
const nodemailer = require("nodemailer");
const keys = require("../keys.config");
const axios = require('axios');
const emailValidater = require('email-validator');
const chalk = require('chalk');

// function to send mail
exports.sendmail = ({ emailTo, subject }) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    pool: true,
    auth: {
      user: keys.email, // Joke Bot Email
      pass: keys.password // Joke Bot Password
    }
  });

  // make a request to the joke api to get a random joke to send in the email
  axios
    .get(`https://official-joke-api.appspot.com/random_joke`)
    .then(response => {
      //destructure the joke
      const { data } = response;
      // store the jome in html format
      const html = `
        <h1>🃏 You have received a new joke from the joker 🃏</h1>
        <br />
        <h2>${data.setup}</h2>
        <h3>${data.punchline}</h3>
      `
      // check to see if the entered email is an email
      if (emailValidater.validate(emailTo)) {
        // send mail with defined transport object
        transporter.sendMail({
          from: keys.email,
          to: emailTo,
          subject,
          text: "Another Famous Joke From The Joker 🃏",
          html
        });
      } else {
        console.log(chalk.red('Sorry, that is not a valid email.'));
      };
    })
    .then(() => console.log(chalk.cyan('Joke Sent Successfully!')))
    .catch(error => {
      // check for errors
      if (error) throw error;
      console.log(chalk.red('Sorry, but something went wrong... please try again!'));
    });

};
