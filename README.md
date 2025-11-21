# DocuSync AI
### The AI Documentation Engineer that runs privately on your infrastructure  
**Stop writing docs. Start shipping code.**

---

## 🚀 The Problem

Documentation is always the last priority:

- **Documentation Rot:** Docs become outdated the moment code ships.  
- **Knowledge Silos:** Critical knowledge is trapped in senior engineers’ heads.  
- **Privacy Risks:** You cannot paste proprietary code into public AI tools.

---

## 🛠 The Solution: Hybrid Intelligence

**DocuSync AI automatically documents your codebase.**

When a Pull Request is merged, DocuSync AI:

1. Monitors the Git diff  
2. Generates a human-readable change summary  
3. Updates your internal wiki (Notion/Confluence)

### 🔐 Smart Router (Speed + Privacy)

Our inference layer intelligently routes code to the right engine:

| Lane          | Engine                     | Purpose                                      |
|---------------|-----------------------------|----------------------------------------------|
| **Fast Lane** | Groq API (Llama 3 8B)       | Generic diffs, sub-second inference          |
| **Private Lane** | Local Ollama Instance       | Sensitive logic processed inside your VPC    |

Nothing sensitive ever leaves your infrastructure.

---

## 🏗 Architecture (The $0 Stack)

A fully working production architecture built entirely using **free-tier components**.

| Component      | Technology            | Purpose                        | Cost            |
|----------------|------------------------|--------------------------------|-----------------|
| **Frontend**   | Next.js + Tailwind     | Landing Page & Dashboard       | Free (Vercel)   |
| **Compute**    | Oracle Ampere A1       | 4 vCPUs + 24GB RAM server      | Free            |
| **AI Engine**  | Ollama (Llama 3)       | Local inference                | Free            |
| **Fast Inference** | Groq API            | Cloud inference (fast path)    | Free Tier       |
| **Queue**      | BullMQ + Redis         | Async job processing           | Free (self-hosted) |
| **Database**   | Supabase (pgvector)    | Data + embeddings              | Free Tier       |

---

## 💻 Local Development

This repository contains the **Frontend / Landing Page**.

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/docusync-landing.git
cd docusync-landing

# Install dependencies
npm install

# Run development server
npm run dev