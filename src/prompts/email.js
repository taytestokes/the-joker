// the questions that will be asked when prompted to send an email
exports.questions = [
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