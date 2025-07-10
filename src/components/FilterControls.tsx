import filterOptions from "@/constants/filterOptions";
import sortOptions from "@/constants/sortOptions";
import { FilterControlsProps } from "@/types";
import { Grid3x3 } from "lucide-react";
import React, { useState } from "react";

const FilterControls = ({
  selectedFilter,
  handleFilterChange,
  handleSort,
  sortBy,
  filteredNfts,
}: FilterControlsProps) => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <section className="py-8 px-4 border-b border-slate-700/50">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Filter by:</label>
              <select
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {filteredNfts.length} NFTs found
            </span>
            <div className="flex bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterControls;
