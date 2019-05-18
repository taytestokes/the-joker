#!/usr/bin/env node
require('dotenv').config;
const nodemailer = require("nodemailer");
const keys = require("../keys.config");
const axios = require('axios');
const emailValidater = require('email-validator');
const chalk = require('chalk');

// function to send mail
exports.sendmail = ({ emailTo, subject }) => {
  console.log(chalk.red(keys.email))
  console.log(chalk.red(keys.password))
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    pool: true,
    auth: {
      user: process.env.EMAIL, // Joke Bot Email
      pass: process.env.PASSWORD // Joke Bot Password
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
        <h3>🃏 You have received a new joke from the joker 🃏</h3>
        <br />
        <h4>${data.setup}</h4>
        <h5>${data.punchline}</h5>
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
    .catch(error => {
      // check for errors
      if (error) throw error;
      console.log(chalk.red('Sorry, but something went wrong... please try again!'));
    });
};