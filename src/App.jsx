import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "sonner";
import {
  ExperienceForm,
  ExperienceList,
  SearchFilter,
} from "@/features/experience";
import { experienceApi, SORT_OPTIONS } from "@/common/libs/api";
import { Footer } from "@/components/Footer";

export default function App() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    sort: SORT_OPTIONS.LATEST,
  });

  const fetchExperiences = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (pageNum === 1) setIsLoading(true);
        else setIsLoadingMore(true);

        setError(null);

        const data = await experienceApi.getAll({
          page: pageNum,
          limit: 20,
          search: filters.search,
          sort: filters.sort,
        });

        if (append) {
          setExperiences((prev) => [...prev, ...data.experiences]);
        } else {
          setExperiences(data.experiences);
        }

        setPage(pageNum);
        setHasMore(pageNum < data.totalPages);
      } catch (err) {
        setError(err.message || "Failed to load experiences");
        toast.error(err.message || "Failed to load experiences");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [filters.search, filters.sort]
  );

  // Initial load and filter changes
  useEffect(() => {
    fetchExperiences(1, false);
  }, [fetchExperiences]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handle form submission
  const handleSubmit = async (content) => {
    setIsSubmitting(true);
    try {
      const result = await experienceApi.create(content);

      // Add new experience to the top of the list (only if sorted by latest)
      if (filters.sort === SORT_OPTIONS.LATEST && !filters.search) {
        setExperiences((prev) => [result.data, ...prev]);
      } else {
        // Refresh the list to show in correct position
        fetchExperiences(1, false);
      }

      toast.success("Experience shared successfully!", {
        description: "Thank you for sharing your story.",
      });
    } catch (err) {
      toast.error(err.message || "Failed to share experience");
      throw err; // Re-throw for form to handle
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    fetchExperiences(page + 1, true);
  };

  // Handle retry
  const handleRetry = () => {
    fetchExperiences(1, false);
  };

  return (
    <div className="min-h-screen bg-gradient-animated flex flex-col">
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          className: "glass",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="h-5 w-5 text-white"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Experiences</h1>
              <p className="text-xs text-muted-foreground">
                Share your stories
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
        <div className="space-y-8">
          {/* Form section */}
          <section>
            <ExperienceForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </section>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">
                Community Experiences
              </span>
            </div>
          </div>

          {/* Search and Filter */}
          <section>
            <SearchFilter
              onFilterChange={handleFilterChange}
              initialSearch={filters.search}
              initialSort={filters.sort}
            />
          </section>

          {/* List section */}
          <section>
            <ExperienceList
              experiences={experiences}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              isLoadingMore={isLoadingMore}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
