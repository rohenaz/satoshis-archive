# Satoshi's Archive

Browse Anna's Archive content and permanently store documents on the BSV blockchain.

## Overview

Satoshi's Archive is a web application that provides access to Anna's Archive, with the ability to permanently write document metadata to the Bitcoin SV blockchain for immutable storage and preservation.

## Features

- **Browse Anna's Archive**: Search and discover books, papers, and documents
- **BSV Wallet Integration**: Connect your BSV wallet for blockchain transactions
- **Permanent Storage**: Pay to write document metadata and content to the blockchain
- **Immutable Records**: Documents stored on-chain are permanent and censorship-resistant

## Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks + Context API
- **Wallet**: Yours Wallet integration using yours-wallet-provider

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
- **yours-wallet-provider**: Official Yours Wallet React provider

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
- Yours Wallet browser extension

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

## Legal & Ethical Considerations

**IMPORTANT**: Anna's Archive indexes a wide variety of content, including copyrighted works, public domain materials, and Creative Commons licensed publications. While Anna's Archive itself claims not to host files directly (only linking to third-party sources), much of the content available through the platform is protected by copyright.

**User Responsibility**:
- Users are solely responsible for ensuring they have the legal right to access, download, and store any content on the blockchain
- Storing copyrighted material without permission may violate copyright laws in your jurisdiction
- This application does not make legal determinations about content - it is a tool that users operate at their own discretion and legal risk
- We strongly recommend only storing public domain, Creative Commons, or content you have explicit rights to

**This Software**:
- The Satoshi's Archive software itself is provided under the MIT license
- The software does not endorse or encourage copyright infringement
- Users assume all legal liability for their use of the platform

**Intended Use**: This platform is designed for preserving legally permissible content such as public domain works, Creative Commons publications, personal documents, and materials where users hold appropriate rights.

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT

## Links

- [Anna's Archive](https://annas-archive.org)
- [BSV Documentation](https://docs.bsvblockchain.org)
- [Yours Wallet](https://yours.org)
