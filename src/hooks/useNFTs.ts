import { useState, useEffect, useCallback } from "react";
import { apiService } from "../services/apiService";
import { NFT, NFTFilterOptions, UseNFTsReturn } from "@/types";

export const useNFTs = (initialLimit: number = 20): UseNFTsReturn => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [filters, setFilters] = useState<NFTFilterOptions>({});

  const fetchNFTs = useCallback(
    async (page: number = 1, append: boolean = false) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.getNFTs(page, initialLimit);

        if (append) {
          setNfts((prev) => [...prev, ...response.data]);
        } else {
          setNfts(response.data);
        }

        setHasMore(response.hasMore);
        setCurrentPage(page);
        setTotalNFTs(response.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch NFTs");
      } finally {
        setLoading(false);
      }
    },
    [initialLimit]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await fetchNFTs(currentPage + 1, true);
  }, [hasMore, loading, currentPage, fetchNFTs]);

  const refetch = useCallback(async () => {
    setCurrentPage(1);
    await fetchNFTs(1, false);
  }, [fetchNFTs]);

  const applyFilters = useCallback(
    (nftList: NFT[]) => {
      let filtered = [...nftList];

      if (filters.priceRange) {
        filtered = filtered.filter((nft) => {
          const price = parseFloat(nft.price || "0");
          return (
            price >= filters.priceRange!.min && price <= filters.priceRange!.max
          );
        });
      }

      if (filters.rarity) {
        filtered = filtered.filter((nft) =>
          nft.metadata?.attributes?.some(
            (attr) =>
              attr.trait_type === "Rarity" &&
              attr.value.toString().toLowerCase() ===
                filters.rarity!.toLowerCase()
          )
        );
      }

      if (filters.sortBy) {
        filtered.sort((a, b) => {
          let aValue: any, bValue: any;

          switch (filters.sortBy) {
            case "price":
              aValue = parseFloat(a.price || "0");
              bValue = parseFloat(b.price || "0");
              break;
            case "rarity":
              aValue = a.rarity?.score || 0;
              bValue = b.rarity?.score || 0;
              break;
            case "name":
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
              break;
            case "recent":
              aValue = new Date(a.lastSale?.date || "").getTime();
              bValue = new Date(b.lastSale?.date || "").getTime();
              break;
            default:
              return 0;
          }

          const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          return filters.sortOrder === "desc" ? -comparison : comparison;
        });
      }

      return filtered;
    },
    [filters]
  );

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return {
    nfts: applyFilters(nfts),
    loading,
    error,
    hasMore,
    currentPage,
    totalNFTs,
    fetchNFTs: () => fetchNFTs(),
    loadMore,
    refetch,
    setFilters,
  };
};
