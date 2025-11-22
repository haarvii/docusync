import chalk from 'chalk';
import inquirer from 'inquirer';
import { ConfigManager } from '../config/config-manager.js';

export async function initCommand() {
    console.log(chalk.blue('Initializing DocuSync...'));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'provider',
            message: 'Select AI Provider:',
            choices: ['Groq', 'Ollama'],
        },
        {
            type: 'input',
            name: 'apiKey',
            message: 'Enter Groq API Key:',
            when: (answers) => answers.provider === 'Groq',
            validate: (input) => input.length > 0 || 'API Key is required for Groq',
        },
        {
            type: 'input',
            name: 'docsDir',
            message: 'Where to save docs?',
            default: './docs',
        },
    ]);

    const config = {
        provider: answers.provider.toLowerCase(),
        docsDir: answers.docsDir,
    };

    await ConfigManager.saveConfig(config);
    console.log(chalk.green(`Created .docusync.json`));

    if (answers.apiKey) {
        await ConfigManager.saveEnv({ GROQ_API_KEY: answers.apiKey });
        console.log(chalk.green(`Saved API Key to .env`));
    }

    console.log(chalk.bold.green('\nDocuSync initialized successfully! 🚀'));
}
