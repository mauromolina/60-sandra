"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
      <Input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={COPY.spotify.searchPlaceholder}
        className="pl-10 pr-10 bg-white/80 border-gold/20 focus:border-gold font-sans"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
};
