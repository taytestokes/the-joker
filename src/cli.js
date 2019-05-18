#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const emailPrompt = require('./prompts/email');
const figlet = require('figlet');
const emailSender = require('./commands/sendemail');

// Initial Connection
    // these will log to create the banner of the app
console.clear();
console.log(
    chalk.magenta(
        figlet.textSync('The Joker', {
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })
    )
);
console.log(chalk.green('Thank you for using my app and have fun sending jokes!'))

// Commander Config
program
    .version('1.0,0')
    .description(chalk.yellow('A CLI Application To Send Emails With Random Jokes'));

// Commands
program
    .command('joker new')
    .alias('jn')
    .description('Send a joke to @email')
    .action(() => {
        prompt(emailPrompt.questions).then(answers => emailSender.sendmail(answers));
    });


// Parse The Arguments
program.parse(process.argv);