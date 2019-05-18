// the questions that will be asked when prompted to send an email
exports.questions = [
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your Yahoo email address'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Please enter your password for your email address'
    },
    {
        type: 'input',
        name: 'emailTo',
        message: 'Please enter the @email you would like to joke'
    },
    {
        type: 'input',
        name: 'subject',
        message: 'Please enter the subject of the email'
    }
];