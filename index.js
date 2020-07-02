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
        message: 'Enter your full name.',
        name: 'fullName'
    },
    {
        type: 'input',
        message: 'Enter the current year.',
        name: 'year'
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

        if (data.license === 'MIT') {
            var license = 'MIT License'+'\n'+'\n'+'Copyright (c) ['+data.year+'] ['+data.fullName+']'+'\n'+'\n'+'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:'+'\n'+'\n'+'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'+'\n'+'\n'+' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'

            var badge = 'https://img.shields.io/badge/License-MIT-yellow.svg'
        }
        else {
            var license = 'Apache License'+'\n'+'\n'+'Copyright ['+data.year+'] ['+data.fullName+']'+'\n'+'\n'+'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at'+'\n'+'\n'+'http://www.apache.org/licenses/LICENSE-2.0'+'\n'+'\n'+'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'

            var badge = 'https://img.shields.io/badge/License-Apache%202.0-blue.svg'
        }
    
    let profile = (res.data.html_url)
    let userImage = (res.data.avatar_url)
    const markdown = generateMarkdown(data, profile, license, userImage, badge);
    // console.log(markdown);
    writeFileAsync("ReadMeExport.md", markdown);
    })  
    })    
}

// function call to initialize program
init();

