#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const emailPrompt = require('./prompts/email');
const confirmationPrompt = require('./prompts/confirmation');
const figlet = require('figlet');
const emailSender = require('./commands/sendemail');

// Initial Connection
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
console.log(chalk.blue('Please allow your Yahoo email address to allow third-party applications to access it.'))
console.log(chalk.yellow('Version: 1.1.1'))

// Commander Config
program
    .version('1.1.1')
    .description(chalk.yellow('A CLI Application To Send Emails With Random Jokes'));

// Commands
program
    .command('new')
    .alias('n')
    .description('Send a joke to @email')
    .action(() => {
        prompt(confirmationPrompt.question)
            .then(answer => {
                if (!answer.confirmation) {
                    console.log(chalk.red('Hey, maybe next time!'))
                } else {
                    prompt(emailPrompt.questions)
                        .then(answers => {
                            emailSender.sendmail(answers);
                        });
                }
            });
    });

program
    .command('test')
    .alias('t')
    .description('Test account details')
    .action(() => {
        console.log(
            chalk.green('Email: jokercli@yahoo.com'),
            chalk.green('Password: clijokerbot')
        );
    });

// Parse The Arguments
program.parse(process.argv);