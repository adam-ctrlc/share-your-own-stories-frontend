import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/common/libs/api";

const SORT_LABELS = {
  [SORT_OPTIONS.LATEST]: "Latest",
  [SORT_OPTIONS.OLDEST]: "Oldest",
  [SORT_OPTIONS.MOST_VIEWED]: "Most Viewed",
};

export function SearchFilter({
  onFilterChange,
  initialSearch = "",
  initialSort = SORT_OPTIONS.LATEST,
}) {
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Trigger filter change when debounced search or sort changes
  useEffect(() => {
    onFilterChange({ search: debouncedSearch, sort });
  }, [debouncedSearch, sort, onFilterChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <Input
          id="search-experiences"
          name="search"
          type="search"
          placeholder="Search experiences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          aria-label="Search experiences"
        />
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faFilter}
          className="h-4 w-4 text-muted-foreground hidden sm:block"
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full sm:w-[160px]" aria-label="Sort by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SearchFilter;
