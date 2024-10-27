export default function convertGithubUrlToRaw(githubUrl) {
    if (githubUrl.includes('github.com') && githubUrl.includes('/blob/')) {
        let rawUrl = githubUrl.replace('github.com', 'raw.githubusercontent.com');
        rawUrl = rawUrl.replace('/blob/', '/');
        return rawUrl;
    } else {
        return "Invalid GitHub URL. Please provide a valid URL for an image.";
    }
}