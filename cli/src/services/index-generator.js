import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

export class IndexGenerator {
    constructor(docsDir) {
        this.docsDir = docsDir;
    }

    async generate() {
        const files = await glob('**/*.md', { cwd: this.docsDir, ignore: 'SUMMARY.md' });

        let content = '# Documentation Index\n\n';

        // Group by directory
        const tree = {};
        for (const file of files) {
            const parts = file.split('/');
            let current = tree;
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (i === parts.length - 1) {
                    current[part] = file;
                } else {
                    current[part] = current[part] || {};
                    current = current[part];
                }
            }
        }

        content += this.buildTree(tree, 0);

        await fs.writeFile(path.join(this.docsDir, 'SUMMARY.md'), content);
    }

    buildTree(node, depth) {
        let output = '';
        const indent = '  '.repeat(depth);

        for (const [key, value] of Object.entries(node)) {
            if (typeof value === 'string') {
                output += `${indent}- [${key}](${value})\n`;
            } else {
                output += `${indent}- **${key}/**\n`;
                output += this.buildTree(value, depth + 1);
            }
        }
        return output;
    }
}
