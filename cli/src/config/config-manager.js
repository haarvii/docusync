import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

const CONFIG_FILE = '.docusync.json';
const ENV_FILE = '.env';

export class ConfigManager {
    static async load() {
        try {
            const configPath = path.resolve(process.cwd(), CONFIG_FILE);
            const configFile = await fs.readFile(configPath, 'utf-8');
            const config = JSON.parse(configFile);

            // Load env vars
            dotenv.config();

            return config;
        } catch (error) {
            return null;
        }
    }

    static async saveConfig(config) {
        const configPath = path.resolve(process.cwd(), CONFIG_FILE);
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    }

    static async saveEnv(envVars) {
        const envPath = path.resolve(process.cwd(), ENV_FILE);
        let envContent = '';

        try {
            envContent = await fs.readFile(envPath, 'utf-8');
        } catch (e) {
            // File doesn't exist, start fresh
        }

        for (const [key, value] of Object.entries(envVars)) {
            const regex = new RegExp(`^${key}=.*`, 'm');
            if (envContent.match(regex)) {
                envContent = envContent.replace(regex, `${key}=${value}`);
            } else {
                envContent += `\n${key}=${value}`;
            }
        }

        await fs.writeFile(envPath, envContent.trim() + '\n');
    }
}
