export class MermaidGenerator {
    generate(graph) {
        let output = 'graph TD\n';

        for (const edge of graph.edges) {
            const from = this.sanitize(edge.from);
            const to = this.sanitize(edge.to);
            output += `    ${from} -->|${edge.type}| ${to}\n`;
        }

        return output;
    }

    sanitize(path) {
        // Convert path to safe ID
        return path.replace(/[^a-zA-Z0-9]/g, '_');
    }
}
