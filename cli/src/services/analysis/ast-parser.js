import { parse } from '@swc/core';
import fs from 'fs/promises';

export class ASTParser {
    async parseFile(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const ast = await parse(content, {
                syntax: 'typescript',
                tsx: true,
                target: 'es2022',
            });
            return ast;
        } catch (error) {
            console.error(`Error parsing ${filePath}:`, error.message);
            return null;
        }
    }
}
