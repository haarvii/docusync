import Groq from 'groq-sdk';
import { AIProvider } from './ai-provider.js';

export class GroqAdapter extends AIProvider {
    constructor(apiKey) {
        super();
        this.groq = new Groq({ apiKey });
    }

    async generateDocs(diff, systemPrompt) {
        const completion = await this.groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: diff },
            ],
            model: 'openai/gpt-oss-20b',
        });

        return completion.choices[0]?.message?.content || '';
    }
}
