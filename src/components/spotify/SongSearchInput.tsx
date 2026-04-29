"use client";

import { Search } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";

interface SongSearchInputProps {
  query: string;
  onQueryChange: (q: string) => void;
  isLoading: boolean;
}

export const SongSearchInput = ({
  query,
  onQueryChange,
  isLoading,
}: SongSearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-gray" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={COPY.spotify.searchPlaceholder}
        className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-12 font-sans text-sm text-charcoal placeholder:text-warm-gray focus:border-spotify-green focus:outline-none focus:ring-1 focus:ring-spotify-green transition-colors"
      />
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
};
