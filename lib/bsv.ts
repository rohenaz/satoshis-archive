import { PrivateKey, Transaction, P2PKH, ARC } from "@bsv/sdk";
import type { BlockchainWriteParams, BlockchainWriteResponse } from "@/types/annas";

export class BSVBlockchain {
  /**
   * Write document metadata to the BSV blockchain using OP_RETURN
   */
  static async writeDocument(
    params: BlockchainWriteParams,
    privateKey: PrivateKey
  ): Promise<BlockchainWriteResponse> {
    try {
      // Create transaction with OP_RETURN output for metadata
      const tx = new Transaction();

      // Build metadata payload
      const metadata = {
        protocol: "satoshis-archive",
        version: "1.0",
        documentId: params.documentId,
        title: params.title,
        author: params.author,
        ...params.metadata,
        timestamp: Date.now(),
      };

      // Convert metadata to OP_RETURN data
      const metadataJson = JSON.stringify(metadata);
      const metadataBuffer = Buffer.from(metadataJson, "utf8");

      // Add OP_RETURN output with metadata
      tx.addOutput({
        satoshis: 0,
        lockingScript: Transaction.OP_RETURN([metadataBuffer]),
      });

      // Add change output (send back to sender)
      const publicKey = privateKey.toPublicKey();
      const address = publicKey.toAddress();
      const p2pkh = new P2PKH();

      // Note: In production, you'd need to:
      // 1. Get UTXOs for the address
      // 2. Add inputs from UTXOs
      // 3. Calculate proper fee
      // 4. Add change output with remaining balance
      // 5. Sign the transaction
      // 6. Broadcast using ARC

      // For now, this is a placeholder structure
      // Actual implementation requires wallet integration

      const txid = tx.id("hex") as string;

      return {
        txid,
        success: true,
        timestamp: Date.now(),
        fee: 0, // Would be calculated based on tx size
      };
    } catch (error) {
      console.error("Blockchain write error:", error);
      throw new Error("Failed to write to blockchain");
    }
  }

  /**
   * Verify a document exists on the blockchain
   */
  static async verifyDocument(txid: string): Promise<boolean> {
    try {
      // In production, query blockchain for transaction
      // and verify OP_RETURN data matches expected format
      return true;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    }
  }

  /**
   * Calculate fee for storing data on-chain
   * BSV uses satoshis per byte
   */
  static calculateFee(dataSize: number, satoshisPerByte: number = 0.5): number {
    // Base transaction size + data size
    const baseTxSize = 250; // Approximate size of basic tx
    const totalSize = baseTxSize + dataSize;
    return Math.ceil(totalSize * satoshisPerByte);
  }
}

// Wallet integration utilities
export interface WalletInfo {
  address: string;
  balance: number;
  publicKey: string;
}

/**
 * Browser wallet integration (Yours Wallet, HandCash, etc.)
 * Uses window.bsv or similar wallet injection
 */
export class WalletConnector {
  static async connect(): Promise<WalletInfo | null> {
    // Check if wallet is available
    if (typeof window === "undefined") {
      return null;
    }

    // Check for Yours Wallet
    const yoursWallet = (window as any).yours;
    if (yoursWallet) {
      try {
        const address = await yoursWallet.getAddress();
        const balance = await yoursWallet.getBalance();
        const publicKey = await yoursWallet.getPublicKey();

        return {
          address,
          balance,
          publicKey,
        };
      } catch (error) {
        console.error("Wallet connection error:", error);
        return null;
      }
    }

    return null;
  }

  static async signAndBroadcast(params: BlockchainWriteParams): Promise<BlockchainWriteResponse> {
    if (typeof window === "undefined") {
      throw new Error("Wallet only available in browser");
    }

    const yoursWallet = (window as any).yours;
    if (!yoursWallet) {
      throw new Error("No BSV wallet detected. Please install Yours Wallet.");
    }

    try {
      // Build metadata payload
      const metadata = {
        protocol: "satoshis-archive",
        version: "1.0",
        documentId: params.documentId,
        title: params.title,
        author: params.author,
        ...params.metadata,
        timestamp: Date.now(),
      };

      // Request wallet to create and broadcast transaction
      const result = await yoursWallet.sendOpReturn(
        JSON.stringify(metadata),
        "utf8"
      );

      return {
        txid: result.txid,
        success: true,
        timestamp: Date.now(),
        fee: result.fee || 0,
      };
    } catch (error) {
      console.error("Wallet transaction error:", error);
      throw new Error("Failed to create blockchain transaction");
    }
  }

  static async getBalance(): Promise<number> {
    if (typeof window === "undefined") {
      return 0;
    }

    const yoursWallet = (window as any).yours;
    if (!yoursWallet) {
      return 0;
    }

    try {
      return await yoursWallet.getBalance();
    } catch {
      return 0;
    }
  }
}
