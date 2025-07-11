import { useEffect, useRef, useCallback, useState } from "react";
import LoadingCard from "./LoadingCard";
import ErrorCard from "./ErrorCard";
import { NFT, NftGridProps } from "@/types";
import { Search, Loader2, ChevronDown } from "lucide-react";
import NftCard from "./NftCard";

const NftGrid = ({
  filteredNfts,
  handleNftView,
  handleNftLike,
  loading,
  error,
  onRetry,
  loadMore,
  hasMore = false,
  isLoadingMore = false,
}: NftGridProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(true);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (
        target.isIntersecting &&
        hasMore &&
        !loading &&
        !isLoadingMore &&
        loadMore
      ) {
        if (autoLoadEnabled) {
          loadMore();
        } else {
          setShowLoadMoreButton(true);
        }
      }
    },
    [hasMore, loading, isLoadingMore, loadMore, autoLoadEnabled]
  );

  const hasAutoLoadBeenDisabled = useRef(false);

  useEffect(() => {
    if (!hasAutoLoadBeenDisabled.current && filteredNfts.length > 60) {
      setAutoLoadEnabled(false);
      hasAutoLoadBeenDisabled.current = true;
    }
  }, [filteredNfts.length]);

  const handleManualLoadMore = async () => {
    if (loadMore) {
      setShowLoadMoreButton(false);
      await loadMore();
    }
  };

  const handleToggleAutoLoad = () => {
    setAutoLoadEnabled(!autoLoadEnabled);
    setShowLoadMoreButton(false);
  };

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        {loading && filteredNfts.length === 0 ? (
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
          <>
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

            {hasMore && (
              <div className="mt-12 text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-slate-400 text-sm">Auto-load:</span>
                  <button
                    onClick={handleToggleAutoLoad}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoLoadEnabled ? "bg-purple-600" : "bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoLoadEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-slate-400 text-sm">
                    {autoLoadEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>

                {(showLoadMoreButton || !autoLoadEnabled) && (
                  <button
                    onClick={handleManualLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        Load More NFTs
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {autoLoadEnabled && (
              <div
                ref={loadMoreRef}
                className="h-10 flex items-center justify-center"
              >
                {isLoadingMore && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more NFTs...</span>
                  </div>
                )}
              </div>
            )}

            {!hasMore && filteredNfts.length > 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 text-slate-400 text-sm">
                  <span>🎉 You've seen all NFTs in this collection!</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NftGrid;
