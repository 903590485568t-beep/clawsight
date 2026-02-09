# ClawSight - Solana Token Sniper

A high-aesthetic, neon-red themed memecoin sniping tool on Solana.

## Features

- **Futuristic Design**: Neon red palette, animations, and responsive layout.
- **Wallet Connection**: Secure connection via Phantom, Solflare, etc. using `@solana/wallet-adapter`.
- **Token Sniping**: Interface to search and snipe tokens by name, contract, or image.
- **Live Feed**: Real-time (mock) feed of trending tokens.
- **ClawSight Token**: Hero section showcasing the native token.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Framer Motion
- **Blockchain**: `@solana/web3.js`, Solana Wallet Adapter

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open in browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## Configuration

- **Theme**: Customizable in `src/app/globals.css`.
- **Wallet**: Configured in `src/components/WalletContextProvider.tsx`. Mainnet by default.

## Deployment

Deploy easily on Vercel:

```bash
npx vercel
```
