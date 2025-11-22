import path from 'path';
import { ASTParser } from './ast-parser.js';

export class GraphBuilder {
    constructor(entryFile) {
        this.entryFile = path.resolve(entryFile);
        this.parser = new ASTParser();
        this.graph = {
            nodes: {},
            edges: [],
        };
        this.visited = new Set();
    }

    async build() {
        await this.processFile(this.entryFile);
        return this.graph;
    }

    async processFile(filePath) {
        if (this.visited.has(filePath)) return;
        this.visited.add(filePath);

        const ast = await this.parser.parseFile(filePath);
        if (!ast) return;

        const relativePath = path.relative(process.cwd(), filePath);
        this.graph.nodes[relativePath] = {
            id: relativePath,
            components: [],
            hooks: [],
        };

        for (const item of ast.body) {
            // Detect Imports
            if (item.type === 'ImportDeclaration') {
                const source = item.source.value;
                if (source.startsWith('.')) {
                    const importPath = path.resolve(path.dirname(filePath), source);
                    // Simple resolution for .js/.tsx extensions
                    const resolvedPath = await this.resolvePath(importPath);

                    if (resolvedPath) {
                        this.graph.edges.push({
                            from: relativePath,
                            to: path.relative(process.cwd(), resolvedPath),
                            type: 'import',
                        });
                        await this.processFile(resolvedPath);
                    }
                }
            }

            // Detect Components (Exported Functions)
            if (item.type === 'ExportDeclaration' && item.declaration.type === 'FunctionDeclaration') {
                const name = item.declaration.identifier.value;
                // Simple heuristic: PascalCase functions are components
                if (/^[A-Z]/.test(name)) {
                    this.graph.nodes[relativePath].components.push(name);
                }
            }
        }
    }

    async resolvePath(basePath) {
        const extensions = ['.js', '.jsx', '.ts', '.tsx'];
        const fs = await import('fs/promises');

        for (const ext of extensions) {
            const fullPath = basePath + ext;
            try {
                await fs.access(fullPath);
                return fullPath;
            } catch (e) { }
        }

        // Check if directory index
        for (const ext of extensions) {
            const fullPath = path.join(basePath, 'index' + ext);
            try {
                await fs.access(fullPath);
                return fullPath;
            } catch (e) { }
        }

        return null;
    }
}
