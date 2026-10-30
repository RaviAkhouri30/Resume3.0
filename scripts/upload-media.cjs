/**
 * Uploads the profile photo and/or resume PDF to Cloudinary under fixed public IDs.
 *
 * Usage:
 *   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name> \
 *     node scripts/upload-media.cjs [--photo <image file>] [--resume <pdf file>]
 *
 * Re-running overwrites the same public IDs and invalidates the CDN cache, so the URLs used
 * by the site never change. Credentials are read only from the environment and never stored.
 * The public IDs must match `media` in src/environments/environment*.ts.
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const PUBLIC_IDS = {
    photo: 'portfolio/profile',
    resume: 'portfolio/Ravi_Akhouri_Resume'
};

function parseCredentials(value) {
    const match = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(value ?? '');
    if (!match) {
        throw new Error('Set CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name> (Dashboard → API Keys).');
    }
    const [, apiKey, apiSecret, cloudName] = match;
    return { apiKey, apiSecret, cloudName };
}

function parseArgs(argv) {
    const files = {};
    for (let i = 0; i < argv.length; i += 2) {
        const key = argv[i]?.replace(/^--/, '');
        if (!(key in PUBLIC_IDS) || !argv[i + 1]) {
            throw new Error('Usage: node scripts/upload-media.cjs [--photo <image file>] [--resume <pdf file>]');
        }
        files[key] = path.resolve(argv[i + 1]);
    }
    if (Object.keys(files).length === 0) {
        throw new Error('Nothing to upload: pass --photo and/or --resume.');
    }
    return files;
}

/**
 * Cloudinary signature: sorted `key=value` pairs joined by `&`, followed by the API secret, SHA-256 hashed.
 * Cloudinary accepts SHA-256 by default; SHA-1 is avoided because it is a weak hash.
 */
function sign(params, apiSecret) {
    const payload = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
    return crypto.createHash('sha256').update(payload + apiSecret).digest('hex');
}

async function upload(credentials, filePath, publicId) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const params = { invalidate: 'true', overwrite: 'true', public_id: publicId, timestamp: Math.floor(Date.now() / 1000) };
    const form = new FormData();
    Object.entries(params).forEach(([key, value]) => form.append(key, String(value)));
    form.append('api_key', credentials.apiKey);
    form.append('signature', sign(params, credentials.apiSecret));
    form.append('file', new Blob([fs.readFileSync(filePath)]), path.basename(filePath));

    // PDFs are uploaded as the `image` resource type so delivery flags such as fl_attachment work.
    const response = await fetch(`https://api.cloudinary.com/v1_1/${credentials.cloudName}/image/upload`, { method: 'POST', body: form });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(`Upload of ${path.basename(filePath)} failed: ${result.error?.message ?? response.status}`);
    }
    return result;
}

(async () => {
    const credentials = parseCredentials(process.env.CLOUDINARY_URL);
    const files = parseArgs(process.argv.slice(2));

    for (const [kind, filePath] of Object.entries(files)) {
        const result = await upload(credentials, filePath, PUBLIC_IDS[kind]);
        console.log(`Uploaded ${kind}: ${result.public_id} (${result.format}, ${Math.round(result.bytes / 1024)} kB, version ${result.version})`);
    }

    console.log(`\nSet media.cloudName to '${credentials.cloudName}' in src/environments/environment*.ts.`);
    if (files.resume) {
        console.log('If the resume link returns 401, enable "Allow delivery of PDF and ZIP files" in Cloudinary Settings → Security.');
    }
})().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
