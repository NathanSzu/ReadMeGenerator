// function to generate markdown for README
function generateMarkdown(data, profile) {

  

  return `# ${data.title}
  ## Description
  ${data.description}
  ## Table of Contents

  <a href='#Installation'>Installation</a>

  <a href='#Usage'>Usage</a>

  <a href='#License'>License</a>

  <a href='#Contribution'>Contribution</a>

  <a href='#Tests'>Tests</a>

  <a href='#Questions'>Questions</a>

  ## <a id='Installation' style='color:white;'>Installation</a>
  ${data.installation}
  ## <a id='Usage' style='color:white;'>Usage</a>
  ${data.usage}
  ## <a id='License' style='color:white;'>License</a>
  ${data.license}
  ## <a id='Contribution' style='color:white;'>Contribution</a>
  ${data.contribution}
  ## <a id='Tests' style='color:white;'>Tests</a>
  ${data.test}
  ## <a id='Questions' style='color:white;'>Questions</a>
  GitHub Username: ${data.username}

  Github Profile: <a href='${profile}'>${profile}</a>

  Email: ${data.email}
`;
}

module.exports = generateMarkdown;
