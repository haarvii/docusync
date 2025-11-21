import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: '%s | DocuSync AI',
    default: 'DocuSync AI - The Private AI Documentation Engineer', // Default title
  },
  description: 'Stop writing docs. Start shipping code. The only AI documentation tool that runs privately on your infrastructure (Oracle/AWS).',
  icons: {
    icon: '/logo.png', // This points to your favicon
    shortcut: '/logo.png',
    apple: '/logo.png', // For iPhone home screen
  },
  openGraph: {
    title: 'DocuSync AI',
    description: 'Automated documentation for secure teams.',
    url: 'https://docusync-seven.vercel.app/',
    siteName: 'DocuSync AI',
    images: [
      {
        url: '/og-image.png', // We will create this next
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
