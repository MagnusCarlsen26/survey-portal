const readline = require('readline');

// Function to convert the Google Drive link to a direct image URL
function convertDriveLinkToImageURL(driveLink) {
    const fileId = driveLink.match(/[-\w]{25,}/);

    if (fileId) {
        const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
        return imageUrl;
    } else {
        return null;
    }
}

// Set up readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for the Google Drive link
rl.question("Enter Google Drive link: ", (driveLink) => {
    const imageUrl = convertDriveLinkToImageURL(driveLink);

    if (imageUrl) {
        console.log("Direct Image URL:", imageUrl);
    } else {
        console.log("Invalid Google Drive link provided.");
    }

    // Close the readline interface
    rl.close();
});
