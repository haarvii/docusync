import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs/promises';
import path from 'path';
import { ConfigManager } from '../config/config-manager.js';
import { GitService } from '../services/git.js';
import { AIFactory } from '../services/ai/factory.js';

const SYSTEM_PROMPT = `You are a Senior Technical Writer. Analyze the following git diff.
Summarize the logic changes in plain English.
Highlight any breaking changes (API signature updates).
Do not explain 'formatting' or 'whitespace' changes. Focus on LOGIC.
Output Format: Markdown.`;

export async function runCommand() {
    const spinner = ora('Checking configuration...').start();

    try {
        const config = await ConfigManager.load();
        if (!config) {
            spinner.fail('Configuration not found. Please run "docusync init" first.');
            return;
        }

        const git = new GitService();
        if (!await git.isRepo()) {
            spinner.fail('Not a git repository.');
            return;
        }

        spinner.text = 'Checking for changes...';
        let diff = await git.getDiff(true); // Check staged first

        if (!diff) {
            spinner.info('No staged changes found. Checking HEAD...');
            diff = await git.getDiff(false); // Check HEAD
        }

        if (!diff) {
            spinner.succeed('No changes detected.');
            return;
        }

        spinner.text = `Generating docs using ${config.provider}...`;

        const aiConfig = {
            apiKey: process.env.GROQ_API_KEY,
        };

        const ai = AIFactory.create(config.provider, aiConfig);
        const docs = await ai.generateDocs(diff, SYSTEM_PROMPT);

        spinner.text = 'Writing documentation...';

        const docsDir = path.resolve(process.cwd(), config.docsDir);
        await fs.mkdir(docsDir, { recursive: true });

        const outputFile = path.join(docsDir, 'changelog.md');
        const timestamp = new Date().toISOString().split('T')[0];
        const content = `\n## Update ${timestamp}\n\n${docs}\n`;

        await fs.appendFile(outputFile, content);

        spinner.succeed(`Documentation generated in ${outputFile}`);

    } catch (error) {
        spinner.fail(`Error: ${error.message}`);
        if (process.env.DEBUG) {
            console.error(error);
        }
    }
}
