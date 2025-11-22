import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import { ConfigManager } from '../config/config-manager.js';
import { AIFactory } from './ai/factory.js';
import { FileWalker } from './file-walker.js';

const AUDIT_PROMPT = `You are a Senior Software Architect. Analyze this entire source file.
High-Level Purpose: What does this module do?
Key Components: List classes/functions and their roles.
Dependencies: What internal/external libraries does it rely on?
Usage Example: If applicable, write a pseudo-code example of how to call this code.
Output strictly in Markdown.`;

const MAX_TOKENS = 6000 * 4; // Approx 24kb

export class AuditService {
    constructor(options) {
        this.options = options;
    }

    async run() {
        const config = await ConfigManager.load();
        if (!config) {
            console.error(chalk.red('Configuration not found. Please run "docusync init" first.'));
            return;
        }

        const walker = new FileWalker(this.options);
        console.log('Scanning for files in:', walker.dir);
        const files = await walker.findFiles();
        console.log('Files found:', files);

        if (files.length === 0) {
            console.log(chalk.yellow('No files found to audit.'));
            return;
        }

        console.log(chalk.blue(`Found ${files.length} files to audit.`));

        const aiConfig = {
            apiKey: process.env.GROQ_API_KEY,
        };
        const ai = AIFactory.create(config.provider, aiConfig);

        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(files.length, 0);

        const docsDir = path.resolve(process.cwd(), config.docsDir);

        for (const file of files) {
            try {
                await this.processFile(file, ai, docsDir);
            } catch (error) {
                // Log error but continue
                console.error(chalk.red(`Error processing ${file}: ${error.message}`));
            }
            bar.increment();

            // Rate limiting for Groq (simple delay)
            if (config.provider === 'groq') {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        bar.stop();

        console.log(chalk.blue('Generating index...'));
        const { IndexGenerator } = await import('./index-generator.js');
        const indexer = new IndexGenerator(docsDir);
        await indexer.generate();

        console.log(chalk.green('\nAudit complete!'));
    }

    async processFile(filePath, ai, docsDir) {
        const relativePath = path.relative(process.cwd(), filePath);
        const docPath = path.join(docsDir, relativePath + '.md');

        // Resumability: Skip if exists
        try {
            await fs.access(docPath);
            return; // Exists
        } catch (e) {
            // Doesn't exist, proceed
        }

        const content = await fs.readFile(filePath, 'utf-8');

        // Size check
        if (content.length > MAX_TOKENS) {
            // console.warn(chalk.yellow(`Skipping ${relativePath}: Too large`));
            return;
        }

        // Context Injection
        let systemPrompt = AUDIT_PROMPT;
        try {
            const graphPath = path.resolve(process.cwd(), 'docusync-graph.json');
            const graphData = await fs.readFile(graphPath, 'utf-8');
            const graph = JSON.parse(graphData);

            const node = graph.nodes[relativePath];
            if (node) {
                systemPrompt += `\n\nCONTEXT:\n`;
                // Find parents (who imports this?)
                const parents = graph.edges
                    .filter(e => e.to === relativePath && e.type === 'import')
                    .map(e => e.from);

                if (parents.length > 0) {
                    systemPrompt += `- Imported by: ${parents.join(', ')}\n`;
                }

                if (node.components.length > 0) {
                    systemPrompt += `- Components: ${node.components.join(', ')}\n`;
                }
            }
        } catch (e) {
            // No graph found, ignore
        }

        const docs = await ai.generateDocs(content, systemPrompt);

        await fs.mkdir(path.dirname(docPath), { recursive: true });
        await fs.writeFile(docPath, docs);
    }
}
