// process.env.GOOGLE_APPLICATION_CREDENTIALS = './.gcp-key.json';

const secretsCache = new Map(); // In-memory cache
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function fetchSecret(secretName) {
    if (secretsCache.has(secretName)) {
        return secretsCache.get(secretName);
    }

    const projectId = await client.getProjectId();
    const [version] = await client.accessSecretVersion({
        name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
    });

    const secret = version.payload.data.toString('utf8');
    secretsCache.set(secretName, secret); // Cache it
    return secret;
}

module.exports = { fetchSecret };