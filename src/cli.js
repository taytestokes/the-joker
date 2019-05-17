const program = require('commander');
const chalk = require('chalk');

// Commander Config
program
    .version('1.0,0')
    .description(chalk.yellow('A CLI Application To Send Emails With Random Jokes'));

// Commands

// Parse The Arguments
program.parse(process.argv);