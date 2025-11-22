import chalk from 'chalk';
import { AuditService } from '../services/audit-service.js';

export async function auditCommand(options) {
    console.log(chalk.blue('Starting Archaeology Mode...'));

    const service = new AuditService(options);
    await service.run();
}
