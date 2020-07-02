var inquirer = require('inquirer');
var fs = require('fs');
var util = require('util');
const axios = require('axios');
var generateMarkdown = require('./utils/generateMarkdown');
var writeFileAsync = util.promisify(fs.writeFile)

// array of questions for user
const questions = [
    {
        type: 'input',
        message: 'What is the project title?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Enter a brief description.',
        name: 'description'
    },
    {
        type: 'input',
        message: 'What are your installation instructions?',
        name: 'installation'
    },
    {
        type: 'input',
        message: 'How do we use this application?',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'How can others contribute to this project?',
        name: 'contribution'
    },
    {
        type: 'input',
        message: 'Enter test instructions',
        name: 'test'
    },
    {
        type: 'list',
        message: 'What license do you want to use?',
        name: 'license',
        choices: ['MIT', 'Apache']
    },
    {
        type: 'input',
        message: 'Enter your github username.',
        name: 'username'
    },
    {
        type: 'input',
        message: 'Enter your email address.',
        name: 'email'
    }
];

// function to write README file
// function writeToFile(fileName, data) {
// }

// function to initialize program
function init() {
    inquirer
    .prompt(questions)
    .then((data) => {
    // After receiving our data object I use that to make a GitHub call through Axios
    axios
    .get(`https://api.github.com/users/${data.username}`)
    .then((res) =>{
    let profile = (res.data.html_url)
    console.log(res.data.avatar_url)
    const markdown = generateMarkdown(data, profile);
    // console.log(markdown);
    writeFileAsync("ReadMeExport.md", markdown);
    })  
    })    
}

// function call to initialize program
init();

