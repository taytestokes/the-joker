const program = require('commander');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const emailPrompt = require('./prompts/email');
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
console.log(chalk.yellow('Created by Tayte Stokes'));

// Commander Config
program
    .version('1.0,0')
    .description(chalk.yellow('A CLI Application To Send Emails With Random Jokes'));

// Commands
program
    .command('send joke')
    .alias('new')
    .description('Send a joke to @email')
    .action(() => {
        prompt(emailPrompt.questions).then(answers => emailSender.sendmail(answers));
    });


// Parse The Arguments
program.parse(process.argv);