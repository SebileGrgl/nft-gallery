"use client";
import React, { useState, useEffect } from "react";
import { NFT } from "@/types";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterControls from "@/components/FilterControls";
import NftGrid from "@/components/NftGrid";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { useNFTs } from "@/hooks/useNFTs";

const NFTGalleryPage: React.FC = () => {
  const {
    nfts,
    loading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    setFilters,
    fetchNFTs,
  } = useNFTs();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"price" | "rarity" | "name" | "recent">(
    "rarity"
  );

  useEffect(() => {
    setFilters({
      rarity: selectedFilter !== "all" ? selectedFilter : undefined,
      sortBy: sortBy,
      sortOrder: "asc",
    });
  }, [selectedFilter, sortBy, setFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const isValidSort = (
    value: any
  ): value is "price" | "rarity" | "name" | "recent" => {
    return ["price", "rarity", "name", "recent"].includes(value);
  };

  const handleSort = (sortType: string) => {
    if (isValidSort(sortType)) {
      setSortBy(sortType);
    }
  };

  const handleNftView = (nft: NFT) => {
    console.log("Viewing NFT:", nft.name);
  };

  const handleNftLike = (nft: NFT) => {
    console.log("Liked NFT:", nft.name);
  };

  const searchedNfts = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onSearchChange={handleSearch} />
      <HeroSection />
      <FilterControls
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
        handleSort={handleSort}
        sortBy={sortBy}
        filteredNfts={searchedNfts}
      />
      <NftGrid
        filteredNfts={searchedNfts}
        handleNftView={handleNftView}
        handleNftLike={handleNftLike}
        loading={loading}
        isLoadingMore={isLoadingMore}
        error={error}
        hasMore={hasMore}
        loadMore={loadMore}
        onRetry={async () => await fetchNFTs()}
      />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default NFTGalleryPage;
