import { glob } from 'glob';
import path from 'path';

export class FileWalker {
    constructor(options = {}) {
        this.dir = options.dir || '.';
        this.ignore = [
            '**/node_modules/**',
            '**/.git/**',
            '**/dist/**',
            '**/build/**',
            '**/docs/**',
            '**/*.test.js',
            '**/*.spec.js',
            '**/*.map',
            '**/package-lock.json',
            '**/yarn.lock',
        ];

        if (options.ignore) {
            this.ignore.push(options.ignore);
        }
    }

    async findFiles() {
        return glob('**/*.*', {
            cwd: this.dir,
            ignore: this.ignore,
            nodir: true,
            absolute: true,
        });
    }
}
