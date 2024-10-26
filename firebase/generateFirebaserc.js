// generateFirebaserc.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const firebaseProjectId = process.env.projectId;

if (!firebaseProjectId) {
    console.error('projectId is not defined in the .env file.');
    process.exit(1);
}

const firebasercContent = {
    projects: {
        default: firebaseProjectId
    },
    targets: {},
    etags: {
        [firebaseProjectId]: {
            extensionInstances: {}
        }
    },
    dataconnectEmulatorConfig: {}
};

fs.writeFileSync(path.join(__dirname, '.firebaserc'), JSON.stringify(firebasercContent, null, 2));

console.log('.firebaserc has been generated successfully.');
