import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
console.log(`Checking file: ${envPath}`);
if (!fs.existsSync(envPath)) {
    console.log(`File NOT found!`);
    process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf-8');
const lines = content.split(/\r?\n/);

console.log(`=== ENV KEYS FOUND ===`);
lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
        const parts = trimmed.split('=');
        const key = parts[0].trim();
        const valLen = parts.slice(1).join('=').trim().length;
        console.log(`Line ${index + 1}: Key=[${key}], ValueLength=${valLen}`);
    }
});
