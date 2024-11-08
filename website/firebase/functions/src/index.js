import {onRequest} from "firebase-functions/v2/https";
import { beforecreated, onUserSignup, beforesignedin } from './files/auth.js'
import { isAccess } from './files/survey.js'
import { isAdminAccess } from "./files/admin.js";
import { downloadData } from "./files/download.js";

async function downloadDb(req, res) {
    const url = 'http://13.233.122.134:3000/downloadDb';

    try {
        const response = await axios.get(url, { responseType: 'stream' });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Disposition', 'attachment; filename="db.zip"');

        response.data.pipe(res);

        response.data.on('end', () => {
            console.log('File sent successfully');
        });

        response.data.on('error', (error) => {
            console.error('Error streaming file:', error);
            res.status(500).send('Error streaming data');
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error downloading data');
    }
}

export const helloWorld = onRequest({cors : true},async(req, res) => {
    await downloadData(req,res)
});

export { beforecreated, onUserSignup, beforesignedin, isAccess, isAdminAccess, downloadData }