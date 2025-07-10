import {
  formatAddress,
  formatPrice,
  getRarityStyle,
  truncateText,
} from "@/lib/utils";
import { NftCardProps } from "@/types";
import { ExternalLink, Eye, Heart, TrendingUp } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

const NftCard: React.FC<NftCardProps> = ({
  nft,
  onView,
  onLike,
  showOwner = true,
  showPrice = true,
  showRarity = true,
  className = "",
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(nft);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(nft);
    }
  };

  const rarityAttribute = nft.metadata?.attributes?.find(
    (attr) => attr.trait_type === "Rarity"
  );

  return (
    <div
      className={`group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-square overflow-hidden">
        {!imageError ? (
          <img
            src={nft.image}
            alt={nft.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-700/50">
            <div className="text-slate-400">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        )}

        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-700/50 animate-pulse"></div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleLike}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
            <button
              onClick={handleView}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleView}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </div>
        </div>

        {showRarity && rarityAttribute && (
          <div className="absolute top-4 left-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityStyle(
                rarityAttribute.value.toString(),
                "base"
              )}`}
            >
              {rarityAttribute.value}
            </span>
          </div>
        )}

        {nft.rarity && (
          <div className="absolute top-4 left-4 mt-8">
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />#{nft.rarity.rank}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors">
            {truncateText(nft.name, 25)}
          </h3>
          <p className="text-sm text-slate-400">{nft.collection}</p>
        </div>

        {nft.description && (
          <p className="text-sm text-slate-300 leading-relaxed">
            {truncateText(nft.description, 80)}
          </p>
        )}

        {showPrice && nft.price && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Current Price</p>
              <p className="text-lg font-bold text-white">
                {formatPrice(nft.price, nft.currency)}
              </p>
            </div>
            {nft.lastSale && (
              <div className="text-right">
                <p className="text-xs text-slate-400">Last Sale</p>
                <p className="text-sm text-slate-300">
                  {formatPrice(nft.lastSale.price, nft.lastSale.currency)}
                </p>
              </div>
            )}
          </div>
        )}

        {showOwner && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <div>
              <p className="text-xs text-slate-400">Owner</p>
              <p className="text-sm text-slate-300 font-mono">
                {formatAddress(nft.owner)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Token ID</p>
              <p className="text-sm text-slate-300 font-mono">#{nft.tokenId}</p>
            </div>
          </div>
        )}

        {nft.metadata?.attributes && nft.metadata.attributes.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {nft.metadata.attributes.slice(0, 3).map((attr, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700/50 rounded-lg text-xs text-slate-300"
              >
                {attr.trait_type}: {attr.value}
              </span>
            ))}
            {nft.metadata.attributes.length > 3 && (
              <span className="px-2 py-1 bg-slate-700/50 rounded-lg text-xs text-slate-400">
                +{nft.metadata.attributes.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default NftCard;
