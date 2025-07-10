import LoadingCard from "./LoadingCard";
import ErrorCard from "./ErrorCard";
import { NFT, NftGridProps } from "@/types";
import { Search } from "lucide-react";
import NftCard from "./NftCard";

const NftGrid = ({
  filteredNfts,
  handleNftView,
  handleNftLike,
  loading,
  error,
  onRetry,
}: NftGridProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ErrorCard message={error} onRetry={onRetry || (() => {})} />
          </div>
        ) : filteredNfts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNfts.map((nft: NFT) => (
              <NftCard
                key={nft.id}
                nft={nft}
                onView={handleNftView}
                onLike={handleNftLike}
                showOwner={true}
                showPrice={true}
                showRarity={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NftGrid;
