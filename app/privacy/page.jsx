"use client";

// app/privacy/page.jsx
import { FileText } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0f0518] text-slate-300 font-sans selection:bg-red-500 selection:text-white">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="h-8 w-8 text-red-500" />
                        <span className="text-2xl font-bold text-white">DocuSync AI</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-400">Last Updated: November 2025</p>
                </header>

                <article className="prose prose-invert prose-red max-w-none">
                    <p className="lead text-lg text-slate-200">
                        We built DocuSync AI specifically because we were tired of AI tools that steal data.
                        Our business model is selling software, not selling your code.
                    </p>

                    <h3>1. The "Hybrid" Data Model</h3>
                    <p>
                        DocuSync operates on a unique hybrid architecture. How your data is handled depends on which mode you select:
                    </p>
                    <ul>
                        <li>
                            <strong>Cloud Mode (Fast):</strong> Code snippets are transmitted to our third-party inference provider (Groq Inc.) for processing.
                            They are transient and not stored by Groq for training.
                        </li>
                        <li>
                            <strong>Private Mode (Local):</strong> Code snippets are processed entirely on your own infrastructure (or our isolated Oracle instance) using local LLMs (Llama 3).
                            In this mode, your source code never leaves the Virtual Private Cloud (VPC).
                        </li>
                    </ul>

                    <h3>2. What We Collect</h3>
                    <p>We collect the minimum viable data required to make the service work:</p>
                    <ul>
                        <li><strong>Authentication:</strong> Your email address and GitHub User ID.</li>
                        <li><strong>Metadata:</strong> Repository names, branch names, and file paths.</li>
                        <li><strong>Vectors:</strong> Mathematical representations (embeddings) of your code, stored in Supabase. These cannot be reverse-engineered into source code.</li>
                    </ul>

                    <h3>3. What We DO NOT Collect</h3>
                    <ul>
                        <li>We <strong>DO NOT</strong> store your raw source code permanently. It is processed in-memory and discarded after the documentation summary is generated.</li>
                        <li>We <strong>DO NOT</strong> use your code to train our own AI models.</li>
                        <li>We <strong>DO NOT</strong> sell your data to third parties.</li>
                    </ul>

                    <h3>4. Third-Party Subprocessors</h3>
                    <p>We use the following trusted infrastructure providers:</p>
                    <table className="w-full text-left border-collapse my-6">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-2">Provider</th>
                                <th className="py-2">Purpose</th>
                                <th className="py-2">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5">
                                <td className="py-2">Oracle Cloud</td>
                                <td className="py-2">Compute & GPU</td>
                                <td className="py-2">US / EU</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-2">Supabase</td>
                                <td className="py-2">Database & Vectors</td>
                                <td className="py-2">AWS US-East</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-2">Groq</td>
                                <td className="py-2">LLM Inference (Cloud Mode Only)</td>
                                <td className="py-2">US</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>5. Data Deletion</h3>
                    <p>
                        You can request full deletion of your account and associated vector embeddings at any time by emailing <a href="mailto:privacy@docusync.ai" className="text-red-400 hover:text-red-300">privacy@docusync.ai</a>.
                        We will wipe your data from our database within 48 hours.
                    </p>
                </article>

                <footer className="mt-16 pt-8 border-t border-white/10 text-center">
                    <a href="/" className="text-slate-400 hover:text-white transition-colors">← Back to Home</a>
                </footer>
            </div>
        </div>


    );
}