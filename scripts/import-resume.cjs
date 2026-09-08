const fs = require('node:fs');
const path = require('node:path');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const credentialPath = process.argv[2] || process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credentialPath) {
    console.error('Provide the service-account JSON path:');
    console.error('node scripts/import-resume.cjs /path/to/service-account.json');
    process.exit(1);
}

const resolvedCredentialPath = path.resolve(credentialPath);
if (!fs.existsSync(resolvedCredentialPath)) {
    console.error(`Credential file not found: ${resolvedCredentialPath}`);
    process.exit(1);
}

const resumePath = path.resolve(__dirname, '../src/app/shared-module/fake-db/fake-db.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
const serviceAccount = JSON.parse(fs.readFileSync(resolvedCredentialPath, 'utf8'));

admin.initializeApp({
    credential: admin.cert(serviceAccount)
});

getFirestore()
    .collection('resume')
    .doc('public')
    .set(resume)
    .then(() => {
        console.log('Imported resume data into /resume/public');
    })
    .catch(error => {
        console.error('Firebase import failed:', error.message);
        process.exitCode = 1;
    });
