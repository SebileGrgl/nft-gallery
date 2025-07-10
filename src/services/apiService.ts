import axios from "axios";
import { NFT, ApiResponse } from "../types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const generateMockNFT = (id: number): NFT => ({
  id: id.toString(),
  name: `Cool NFT #${id}`,
  description: `This is a unique digital collectible #${id} with amazing features and rarity.`,
  image: `https://picsum.photos/400/400?random=${id}`,
  collection: `Collection ${Math.floor(id / 10) + 1}`,
  owner: `0x${Math.random().toString(16).substr(2, 40)}`,
  price: (Math.random() * 5 + 0.1).toFixed(2),
  currency: "ETH",
  tokenId: id.toString(),
  contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
  metadata: {
    attributes: [
      {
        trait_type: "Rarity",
        value: ["Common", "Rare", "Epic", "Legendary"][
          Math.floor(Math.random() * 4)
        ],
      },
      {
        trait_type: "Background",
        value: ["Blue", "Red", "Green", "Purple"][
          Math.floor(Math.random() * 4)
        ],
      },
      {
        trait_type: "Type",
        value: ["Art", "Gaming", "Music", "Sports"][
          Math.floor(Math.random() * 4)
        ],
      },
    ],
    external_url: `https://example.com/nft/${id}`,
  },
  rarity: {
    rank: Math.floor(Math.random() * 1000) + 1,
    score: Math.random() * 100,
  },
  lastSale: {
    price: (Math.random() * 10 + 1).toFixed(2),
    currency: "ETH",
    date: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
});

class ApiService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  async getNFTs(
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<NFT[]>> {
    try {
      const mockNFTs = Array.from({ length: limit }, (_, i) =>
        generateMockNFT((page - 1) * limit + i + 1)
      );

      return {
        data: mockNFTs,
        total: 1000,
        page,
        limit,
        hasMore: page * limit < 1000,
      };
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      throw new Error("Failed to fetch NFTs");
    }
  }

  async getTrendingNFTs(limit: number = 10): Promise<NFT[]> {
    try {
      const mockNFTs = Array.from({ length: limit }, (_, i) =>
        generateMockNFT(Math.floor(Math.random() * 1000) + 1)
      );
      return mockNFTs;
    } catch (error) {
      console.error("Error fetching trending NFTs:", error);
      throw new Error("Failed to fetch trending NFTs");
    }
  }

  async getNFTsByWallet(walletAddress: string): Promise<NFT[]> {
    try {
      const mockNFTs = Array.from({ length: 5 }, (_, i) => ({
        ...generateMockNFT(i + 1),
        owner: walletAddress,
      }));
      return mockNFTs;
    } catch (error) {
      console.error("Error fetching wallet NFTs:", error);
      throw new Error("Failed to fetch wallet NFTs");
    }
  }

  async getNFTDetails(id: string): Promise<NFT> {
    try {
      return generateMockNFT(parseInt(id));
    } catch (error) {
      console.error("Error fetching NFT details:", error);
      throw new Error("Failed to fetch NFT details");
    }
  }
}

export const apiService = new ApiService();
