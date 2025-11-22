import { AIProvider } from './ai-provider.js';

export class MockAdapter extends AIProvider {
    async generateDocs(diff, systemPrompt) {
        return `**Mock Documentation Generated**
    
    Analysis of changes:
    - Detected changes in the codebase.
    - This is a mock response for testing purposes.
    
    Diff size: ${diff.length} characters.`;
    }
}
