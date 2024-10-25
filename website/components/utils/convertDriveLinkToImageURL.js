const readline = require('readline');

function convertGithubUrlToRaw(githubUrl) {
    if (githubUrl.includes('github.com') && githubUrl.includes('/blob/')) {
        let rawUrl = githubUrl.replace('github.com', 'raw.githubusercontent.com');
        rawUrl = rawUrl.replace('/blob/', '/');
        return rawUrl;
    } else {
        return "Invalid GitHub URL. Please provide a valid URL for an image.";
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the GitHub image URL: ", function(githubImageUrl) {
    const rawImageUrl = convertGithubUrlToRaw(githubImageUrl);
    console.log("Raw Image URL:", rawImageUrl);
});
