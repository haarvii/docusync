# 📄 DocuSync CLI  
### _The Local-First AI Documentation Engineer_  
Stop writing docs. Start shipping code.

DocuSync is a command-line tool that automates technical documentation. It reads your code, understands context, analyzes diffs, and generates structured documentation automatically.

**The Killer Feature:**  
Runs fully on your machine using **Ollama (Llama 3)** for 100% privacy — or use **Groq** for blazing-fast cloud inference.

---

## 🚀 Why DocuSync?

### 🔒 Privacy First  
Your proprietary code never leaves your device when using Local Mode (Ollama).

### 🧠 Context Aware  
DocuSync analyzes your project and builds a **dependency graph (AST)** to understand where props, state, and functions originate.

### 🏺 Legacy Friendly  
Use **Archaeology Mode** to scan old or undocumented projects. DocuSync will create documentation for every source file — instantly making sense of legacy codebases.

---

## 📦 Installation

```bash
npm install -g docusync-ai
```

### Prerequisite (Local Mode Only)

To run DocuSync in 100% private, offline mode, install and start
**Ollama**:

``` bash
ollama serve
```

This runs the Llama 3 model locally on your machine.\
No data leaves your device.

------------------------------------------------------------------------

## ⚡ Quick Start

### 1. Initialize Your Project

``` bash
docusync init
```

This generates:

    .docusync.json

You will be prompted to select: - AI Provider (Groq or Ollama) - Output
documentation path - Ignore patterns for files and folders

------------------------------------------------------------------------

### 2. Daily Workflow - Document Your Code Changes

``` bash
docusync run
```

DocuSync will:

-   Read `git diff HEAD`
-   Understand your code changes
-   Generate:

```
    docs/UPDATE_YYYY-MM-DD.md
```
This file contains a human-readable summary of your changes.

------------------------------------------------------------------------

## 🏺 Archaeology Mode (Document Entire Repository)

For undocumented or legacy projects:

``` bash
docusync audit
```

Archaeology Mode will:

-   Scan your entire repository (excluding node_modules, .git, dist,
    etc.)
-   Analyze files one-by-one
-   Generate a README.md for each source file, including:
    -   Purpose of the file
    -   Dependencies
    -   Key functions
    -   High-level summary
    -   How it fits in the overall system

**Note:** This mode is resource-intensive. Expect longer processing
times.

------------------------------------------------------------------------

## 🌳 React Deep Scan (Component Dependency Map)

**Experimental Feature**

``` bash
docusync map --entry ./src/App.tsx
```

This feature:

-   Parses your code using AST (via @swc/core)
-   Maps component hierarchy
-   Detects data/prop flow
-   Highlights context, Redux selectors, and shared state
-   Generates:
    ARCHITECTURE.md

containing a Mermaid.js diagram of your full React component tree.

------------------------------------------------------------------------

## ⚙️ Configuration

After initialization, you'll get a `.docusync.json` file:

``` json
{
  "provider": "ollama",
  "docPath": "./docs",
  "ignore": ["**/*.test.js", "**/*.spec.ts"],
  "model": "llama3"
}
```

### Environment Variables (for Groq Cloud Mode)

To use Groq, create a `.env` file:

    GROQ_API_KEY=gsk_your_key_here

------------------------------------------------------------------------

## 🏗 Architecture

DocuSync uses a **Smart Router**:

-   **Local Mode (Privacy First):** Uses Ollama
-   **Cloud Mode (Speed First):** Uses Groq

  Feature          Technology
  ---------------- ---------------------------
  CLI Framework    commander + inquirer
  Git Operations   simple-git
  AST Parsing      @swc/core
  AI Engine        langchain (Groq / Ollama)
  UI/Output        chalk + ora

------------------------------------------------------------------------

## 🤝 Contributing

We welcome PRs and community contributions!

### Help Wanted

-   [ ] Python AST parsing\
-   [ ] VS Code Extension\
-   [ ] Improving documentation quality prompts\
-   [ ] Multi-language support

### Workflow

``` bash
git fork <repo>
git checkout -b feature/amazing-feature
git commit -m "Add awesome feature"
git push origin feature/amazing-feature
```

Then open a Pull Request 🚀

------------------------------------------------------------------------

## 📄 License

DocuSync is released under the **MIT License**.\
See the `LICENSE` file for more details.