import { LoadMoreProps } from "@/types";
import { ChevronDown, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";

const LoadMore = ({
  filteredNfts,
  loadMore,
  hasMore,
  isLoadingMore,
  loading,
}: LoadMoreProps) => {
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
  }, [handleObserver, filteredNfts.length]);
  return (
    <div>
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
            <Button onClick={handleManualLoadMore} disabled={isLoadingMore}>
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
            </Button>
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
    </div>
  );
};

export default LoadMore;
