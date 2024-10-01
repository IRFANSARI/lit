const fs = require('fs');
const fetch = require('node-fetch');
const { exit } = require('process');
const unzipper = require('unzipper');

async function downloadRepoZip(repoUrl, outputPath) {
  try {
    if (repoUrl.endsWith('.git')) {
      repoUrl = repoUrl.slice(0, -4);
    }

    const mainZipUrl = `${repoUrl}/archive/refs/heads/main.zip`;
    const masterZipUrl = `${repoUrl}/archive/refs/heads/master.zip`;

    console.log(`Cloning GitHub Repository: ${repoUrl}...`);
    let response = await fetch(mainZipUrl);

    if (!response.ok) {
      response = await fetch(masterZipUrl);
    }

    if (response.ok) {
      const fileStream = fs.createWriteStream(outputPath);
      response.body.pipe(fileStream);

      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });
    } else {
      console.error('Error: The GitHub URL is either private or unavailable.');
      exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    exit(1);
  }
}

async function extractZip(outputPath) {
  const directory = await unzipper.Open.file(outputPath);
  await directory.extract({ path: '.' });
}

async function main(repoUrl) {
  const outputPath = `./${Date.now()}.zip`;

  await downloadRepoZip(repoUrl, outputPath);
  await extractZip(outputPath);
  fs.unlinkSync(outputPath);

  console.log('GitHub repository cloned successfully.');
}

module.exports = main;
