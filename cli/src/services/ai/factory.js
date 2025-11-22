import { GroqAdapter } from './groq-adapter.js';
import { OllamaAdapter } from './ollama-adapter.js';
import { MockAdapter } from './mock-adapter.js';

export class AIFactory {
    static create(provider, config) {
        if (provider === 'groq') {
            return new GroqAdapter(config.apiKey);
        } else if (provider === 'ollama') {
            return new OllamaAdapter();
        } else if (provider === 'mock') {
            return new MockAdapter();
        }
        throw new Error(`Unknown AI provider: ${provider}`);
    }
}
