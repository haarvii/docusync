import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { GraphBuilder } from '../services/analysis/graph-builder.js';
import { MermaidGenerator } from '../services/analysis/mermaid-generator.js';

export async function mapCommand(options) {
    console.log(chalk.blue('Starting React Deep Scan...'));

    try {
        const builder = new GraphBuilder(options.entry);
        const graph = await builder.build();

        // Save JSON graph
        await fs.writeFile('docusync-graph.json', JSON.stringify(graph, null, 2));
        console.log(chalk.green('Graph saved to docusync-graph.json'));

        // Generate Mermaid
        const mermaid = new MermaidGenerator();
        const diagram = mermaid.generate(graph);

        await fs.writeFile('ARCHITECTURE.md', '```mermaid\n' + diagram + '\n```');
        console.log(chalk.green('Architecture diagram saved to ARCHITECTURE.md'));

    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
    }
}
