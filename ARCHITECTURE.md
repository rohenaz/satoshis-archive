# Architecture: Minimizing Platform Liability

## Design Philosophy

Satoshi's Archive is architected to minimize platform owner liability by functioning as a **pure client-side tool** where users directly interact with third-party services. The platform owner never touches, stores, proxies, or facilitates access to any content from Anna's Archive.

## Key Legal Principles

### 1. Neutral Technology with Legitimate Purpose
Unlike Popcorn Time (which UK courts ruled had "no legitimate purpose"), Satoshi's Archive has clear legitimate uses:
- Preserving public domain works
- Storing Creative Commons content
- Archiving personal documents
- Academic research preservation
- Historical document timestamping

**Legal Precedent**: Courts distinguish between tools designed purely for infringement vs. tools with substantial non-infringing uses (Sony Betamax doctrine).

### 2. No Server-Side Data Handling
The platform owner **never**:
- Stores or caches content from Anna's Archive
- Proxies API requests to Anna's Archive
- Maintains user accounts or content databases
- Facilitates file sharing between users
- Hosts or link to specific copyrighted works

### 3. User-Provided Credentials
Users must obtain and provide their own Anna's Archive API keys:
- Platform owner doesn't provide API access
- No shared infrastructure for accessing content
- Each user makes their own agreement with Anna's Archive
- Platform owner has no knowledge of what users access

## Technical Architecture

### Client-Side Only Design

```
┌─────────────────────────────────────────────────────────┐
│  User's Browser (All Processing Happens Here)          │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐   ┌───────────┐ │
│  │   React UI   │───▶│ Anna's API   │──▶│  Anna's   │ │
│  │  (Static JS) │    │  (User Key)  │   │  Archive  │ │
│  └──────────────┘    └──────────────┘   └───────────┘ │
│         │                                              │
│         │                                              │
│         ▼                                              │
│  ┌──────────────┐    ┌──────────────┐   ┌───────────┐ │
│  │ BSV Wallet   │───▶│ Blockchain   │──▶│    BSV    │ │
│  │  Integration │    │  TX Builder  │   │  Network  │ │
│  └──────────────┘    └──────────────┘   └───────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │
                          │ Static Files Only
                          │
                   ┌──────┴────────┐
                   │  CDN / IPFS   │
                   │  (HTML/JS/CSS)│
                   └───────────────┘
```

### Data Flow

1. **User downloads static HTML/JS/CSS** from CDN or IPFS
2. **User enters their own Anna's Archive API key** (stored locally in browser)
3. **Browser directly calls Anna's Archive API** using user's key
4. **User selects content to preserve**
5. **Browser creates blockchain transaction** using user's wallet
6. **User signs and broadcasts** transaction to BSV network
7. **Platform owner never sees any of this data**

## Implementation Strategy

### Phase 1: Remove Server-Side API Proxy ✓ (To Do)
- Delete `/app/api/search/route.ts`
- Move all API calls to client-side
- Use CORS proxy only if absolutely necessary (and document that it's user's responsibility)

### Phase 2: User-Provided API Keys ✓ (To Do)
- Add API key input in UI
- Store key in browser localStorage (never sent to our servers)
- Clear warnings that user is responsible for obtaining key
- Link to Anna's Archive donation page

### Phase 3: Static Site Generation
- Build as pure static site (no Next.js API routes)
- Deploy to IPFS, Arweave, or CDN
- No backend servers at all
- Update annually, not dynamically

### Phase 4: Legal Protections
- Terms of Service requiring user compliance with laws
- Explicit disclaimers about copyright
- No knowledge of user activities (no logging, no analytics)
- DMCA agent designation (even though likely not needed)

## Legal Protections

### 1. Tool vs. Service
We provide **software**, not a **service**:
- Like selling a BitTorrent client (legal)
- Unlike running The Pirate Bay (facilitating infringement)
- Software has substantial legitimate uses

### 2. No Actual Knowledge
Platform owner has no knowledge of:
- What content users search for
- What content users store on blockchain
- Whether users comply with copyright law
- What API keys users obtain

### 3. No Inducement
The platform:
- Doesn't encourage copyright infringement
- Prominently displays legal warnings
- Suggests legitimate use cases
- Requires users to acknowledge terms

### 4. Third-Party Integration
- Users contract directly with Anna's Archive (via API key)
- Users use their own wallets for blockchain transactions
- Platform owner is not party to these relationships

## Comparison to Other Technologies

| Technology | Server Involvement | Platform Liability | Satoshi's Archive Model |
|-----------|-------------------|-------------------|------------------------|
| Popcorn Time | None (P2P) | High (no legitimate use) | ✓ Client-side |
| BitTorrent Client | None (P2P) | Low (legitimate uses) | ✓ Legitimate uses |
| Pirate Bay | High (indexes torrents) | High (facilitates) | ✗ No indexing |
| Archive.org | High (hosts content) | Protected (library exemption) | ✗ No hosting |
| **Our Model** | **None (static site)** | **Low (neutral tool)** | **✓ Pure client-side** |

## Deployment Strategy

### Recommended Hosting
1. **IPFS** - Fully decentralized, immutable
2. **Arweave** - Permanent storage, censorship-resistant
3. **GitHub Pages** - Static hosting with DMCA safe harbor
4. **Vercel/Netlify** - Static CDN (less decentralized)

### What NOT to Do
❌ Run a backend server that proxies Anna's Archive
❌ Maintain a database of documents
❌ Provide users with API keys
❌ Cache or store content from Anna's Archive
❌ Track what users search for or store
❌ Create accounts or user profiles

## User Responsibility Framework

### Required User Actions
Users must:
1. ✓ Obtain their own Anna's Archive API key
2. ✓ Verify they have rights to content they store
3. ✓ Comply with copyright laws in their jurisdiction
4. ✓ Use their own BSV wallet
5. ✓ Accept Terms of Service

### Platform Owner Actions
We only:
1. ✓ Provide open-source software
2. ✓ Host static HTML/JS files
3. ✓ Display legal warnings and disclaimers
4. ✓ Document legitimate uses

## References & Legal Research

- [DMCA Safe Harbor - Copyright Alliance](https://copyrightalliance.org/education/copyright-law-explained/the-digital-millennium-copyright-act-dmca/dmca-safe-harbor/)
- [Legal Issues with BitTorrent - Wikipedia](https://en.wikipedia.org/wiki/Legal_issues_with_BitTorrent)
- [Popcorn Time Legal Analysis - Wikipedia](https://en.wikipedia.org/wiki/Popcorn_Time)
- [Section 512 DMCA - U.S. Copyright Office](https://www.copyright.gov/512/)
- [BitTorrent Copyright Liability](https://blogs.ischool.berkeley.edu/i205s14/2014/03/16/bittorrent-and-copyright-infringement-liability-issues/)

## Conclusion

By architecting Satoshi's Archive as a **pure client-side tool** with **substantial legitimate uses** and **zero server-side involvement**, we minimize platform liability to levels comparable to BitTorrent client developers rather than content-hosting platforms.

The key is: **We provide the hammer, users decide what to build.**
