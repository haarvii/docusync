#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from '../src/commands/init.js';
import { runCommand } from '../src/commands/run.js';
import { cleanCommand } from '../src/commands/clean.js';
import { auditCommand } from '../src/commands/audit.js';

const program = new Command();

program
  .name('docusync')
  .description('The Local-First AI Documentation Engineer')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize DocuSync configuration')
  .action(initCommand);

program
  .command('run')
  .description('Generate documentation from git diffs')
  .action(runCommand);

program
  .command('clean')
  .description('Remove temporary cache or history')
  .action(cleanCommand);

program
  .command('audit')
  .description('Scan and document existing codebase')
  .option('-d, --dir <path>', 'Specific directory to scan', '.')
  .option('-i, --ignore <pattern>', 'Additional glob patterns to ignore')
  .action(auditCommand);

import { mapCommand } from '../src/commands/map.js';

program
  .command('map')
  .description('Analyze React application structure')
  .option('-e, --entry <path>', 'Entry file (e.g., src/App.tsx)', './src/App.js')
  .action(mapCommand);

program.parse();
