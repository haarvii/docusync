import axios from 'axios';
import { AIProvider } from './ai-provider.js';

export class OllamaAdapter extends AIProvider {
    constructor(baseUrl = 'http://localhost:11434') {
        super();
        this.baseUrl = baseUrl;
    }

    async generateDocs(diff, systemPrompt) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/generate`, {
                model: 'llama3',
                prompt: `${systemPrompt}\n\n${diff}`,
                stream: false,
            });

            return response.data.response;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Ollama is not running. Please run "ollama serve".');
            }
            throw error;
        }
    }
}
