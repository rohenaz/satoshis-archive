export interface AnnasSearchParams {
  query: string;
  page?: number;
  limit?: number;
  sort?: 'relevance' | 'newest' | 'oldest';
  ext?: string; // file extension filter
  lang?: string; // language filter
}

export interface AnnasDocument {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  year?: string;
  language?: string;
  filesize?: number;
  extension?: string;
  md5?: string;
  description?: string;
  coverUrl?: string;
  downloadUrl?: string;
  license?: string;
  ipfsHash?: string;
}

export interface AnnasSearchResponse {
  total: number;
  page: number;
  limit: number;
  results: AnnasDocument[];
}

export interface BlockchainWriteParams {
  documentId: string;
  title: string;
  author?: string;
  metadata: Record<string, any>;
  contentHash?: string;
}

export interface BlockchainWriteResponse {
  txid: string;
  success: boolean;
  timestamp: number;
  fee: number;
}
