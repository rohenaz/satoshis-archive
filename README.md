# Satoshi's Archive

Browse Anna's Archive content and permanently store documents on the BSV blockchain.

## Overview

Satoshi's Archive is a web application that provides access to Creative Commons and public domain content from Anna's Archive, with the ability to permanently write selected documents to the Bitcoin SV blockchain for immutable storage.

## Features

- **Browse Anna's Archive**: Search and discover Creative Commons publications and public domain materials
- **BSV Wallet Integration**: Connect your BSV wallet for blockchain transactions
- **Permanent Storage**: Pay to write document metadata and content to the blockchain
- **Immutable Records**: Documents stored on-chain are permanent and censorship-resistant

## Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks + Context API
- **Wallet**: BSV wallet integration (Yours Wallet, HandCash, etc.)

### Backend
- **API Routes**: Next.js API routes for Anna's Archive integration
- **Authentication**: API key management for Anna's Archive
- **Blockchain**: BSV library for blockchain writes

### Data Flow
1. User searches Anna's Archive via the UI
2. Frontend queries Next.js API routes
3. API routes fetch from Anna's Archive JSON API
4. User selects document to store on-chain
5. Wallet integration handles payment and transaction signing
6. Document metadata/content written to BSV blockchain
7. Transaction ID returned and displayed to user

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library
- **Anna's Archive API**: Document search and metadata
- **BSV SDK**: Bitcoin SV blockchain integration
- **Yours Wallet**: BSV wallet connectivity

## Environment Variables

```env
ANNAS_SECRET_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Started

### Prerequisites
- Node.js 20+
- Bun (optional, recommended)
- Anna's Archive API key (obtained via donation)
- BSV wallet (Yours Wallet, HandCash, etc.)

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your Anna's Archive API key

# Run development server
bun dev
```

Visit `http://localhost:3000`

## Project Structure

```
satoshis-archive/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── search/       # Search page
│   │   └── store/        # Store to blockchain page
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── search/       # Search-related components
│   │   └── wallet/       # Wallet integration components
│   ├── lib/              # Utilities and libraries
│   │   ├── annas-api.ts  # Anna's Archive API client
│   │   └── bsv.ts        # BSV blockchain utilities
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## Use Cases

- **Academic Preservation**: Store important research papers permanently
- **Historical Records**: Preserve public domain historical documents
- **Open Source Books**: Ensure access to open source literature
- **Educational Materials**: Create immutable educational resources

## Legal & Ethical

This project only supports Creative Commons and public domain content from Anna's Archive. Users are responsible for ensuring they have the right to store content on the blockchain.

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT

## Links

- [Anna's Archive](https://annas-archive.org)
- [BSV Documentation](https://docs.bsvblockchain.org)
- [Yours Wallet](https://yours.org)
