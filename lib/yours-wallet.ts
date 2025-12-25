import type {
  YoursProviderType,
  SendBsv,
  SendBsvResponse,
  Addresses,
  Balance,
} from "yours-wallet-provider/dist/types/providerTypes";
import type { BlockchainWriteParams, BlockchainWriteResponse } from "@/types/annas";

/**
 * Yours Wallet integration for writing document metadata on-chain
 * Uses the official yours-wallet-provider package
 */
export class YoursWalletService {
  /**
   * Write document metadata to the BSV blockchain using sendBsv with data payload
   * @param wallet - The Yours wallet instance from useYoursWallet hook
   * @param params - Document metadata to write on-chain
   * @returns Transaction ID and details
   */
  static async writeDocumentMetadata(
    wallet: YoursProviderType,
    params: BlockchainWriteParams
  ): Promise<BlockchainWriteResponse> {
    if (!wallet.isReady) {
      throw new Error("Wallet is not ready");
    }

    // Check connection
    const isConnected = await wallet.isConnected();
    if (!isConnected) {
      throw new Error("Wallet is not connected. Please connect your Yours Wallet first.");
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

      // Convert metadata to array of hex strings for OP_RETURN
      const metadataJson = JSON.stringify(metadata);
      const dataArray = [
        Buffer.from("satoshis-archive", "utf8").toString("hex"),
        Buffer.from(metadataJson, "utf8").toString("hex"),
      ];

      // Get wallet address for change
      const addresses = await wallet.getAddresses();
      if (!addresses) {
        throw new Error("Failed to get wallet addresses");
      }

      // Create sendBsv parameters with OP_RETURN data
      const sendParams: SendBsv[] = [
        {
          satoshis: 1, // Minimum output (dust limit)
          data: dataArray,
        },
      ];

      // Send transaction with wallet
      const response = await wallet.sendBsv(sendParams);

      if (!response) {
        throw new Error("No response from wallet");
      }

      // Calculate fee from rawtx if available
      let fee = 0;
      if (response.rawtx) {
        // Estimate: ~0.5 sats/byte * tx size
        fee = Math.ceil(response.rawtx.length / 2 * 0.5);
      }

      return {
        txid: response.txid,
        success: true,
        timestamp: Date.now(),
        fee,
      };
    } catch (error) {
      console.error("Failed to write document metadata:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to write to blockchain"
      );
    }
  }

  /**
   * Get wallet balance
   */
  static async getBalance(wallet: YoursProviderType): Promise<Balance | null> {
    if (!wallet.isReady) {
      return null;
    }

    try {
      return await wallet.getBalance() || null;
    } catch (error) {
      console.error("Failed to get balance:", error);
      return null;
    }
  }

  /**
   * Get wallet addresses
   */
  static async getAddresses(wallet: YoursProviderType): Promise<Addresses | null> {
    if (!wallet.isReady) {
      return null;
    }

    try {
      return await wallet.getAddresses() || null;
    } catch (error) {
      console.error("Failed to get addresses:", error);
      return null;
    }
  }

  /**
   * Connect wallet
   */
  static async connect(wallet: YoursProviderType): Promise<string | null> {
    try {
      const address = await wallet.connect();
      return address || null;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return null;
    }
  }

  /**
   * Disconnect wallet
   */
  static async disconnect(wallet: YoursProviderType): Promise<boolean> {
    try {
      return await wallet.disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      return false;
    }
  }

  /**
   * Calculate estimated fee for storing data
   * @param dataSize - Size of data in bytes
   * @param satoshisPerByte - Fee rate (default 0.5)
   */
  static calculateFee(dataSize: number, satoshisPerByte: number = 0.5): number {
    // Base tx size (~250 bytes) + data size
    const baseTxSize = 250;
    const totalSize = baseTxSize + dataSize;
    return Math.ceil(totalSize * satoshisPerByte);
  }
}
