export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  owner: string;
  price?: string;
  currency?: string;
  tokenId: string;
  contractAddress: string;
  metadata?: {
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
    external_url?: string;
    animation_url?: string;
  };
  rarity?: {
    rank: number;
    score: number;
  };
  lastSale?: {
    price: string;
    currency: string;
    date: string;
  };
}

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  floorPrice: string;
  totalSupply: number;
  owners: number;
  verified: boolean;
}

export interface NFTFilterOptions {
  collection?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rarity?: string;
  sortBy?: "price" | "rarity" | "name" | "recent";
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UseNFTsReturn {
  nfts: NFT[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalNFTs: number;
  fetchNFTs: () => Promise<void>;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
  setFilters: (filters: NFTFilterOptions) => void;
}

export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  shortAddress: string | null;
  balance: string | null;
  chainId: number | null;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  ripple?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export interface filterOption {
  value: string;
  label: string;
}

export interface FilterControlsProps {
  selectedFilter: string;
  handleFilterChange: (param: string) => void;
  handleSort: (param: string) => void;
  sortBy: string;
  filteredNfts: NFT[];
}

export interface UseNFTsReturn {
  nfts: NFT[];
  loading: boolean;
  isLoadingMore?: boolean; // Added for infinite scroll
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalNFTs: number;
  fetchNFTs: () => Promise<void>;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
  setFilters: (filters: NFTFilterOptions) => void;
}

export interface NftGridProps {
  filteredNfts: NFT[];
  handleNftView: (nft: NFT) => void;
  handleNftLike: (nft: NFT) => void;
  loading: boolean;
  isLoadingMore?: boolean;
  error: string | null;
  hasMore?: boolean;
  loadMore?: () => Promise<void>;
  onRetry?: () => Promise<void>;
}

export interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

export interface NftCardProps {
  nft: NFT;
  onView?: (nft: NFT) => void;
  onLike?: (nft: NFT) => void;
  showOwner?: boolean;
  showPrice?: boolean;
  showRarity?: boolean;
  className?: string;
}
