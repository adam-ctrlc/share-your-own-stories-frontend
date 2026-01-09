import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import {
  ExperienceForm,
  ExperienceList,
  SearchFilter,
} from "@/features/experience";
import {
  useExperiences,
  useCreateExperience,
  SORT_OPTIONS,
} from "@/common/hooks";
import { Footer } from "@/components/Footer";

export function HomePage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    sort: SORT_OPTIONS.LATEST,
  });

  const { mutate } = useSWRConfig();

  const { experiences, total, totalPages, isLoading, error, mutate: mutateList } = useExperiences({
    page,
    limit: 20,
    search: filters.search,
    sort: filters.sort,
  });

  const { create, isCreating } = useCreateExperience();

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleSubmit = async (data) => {
    try {
      await create(data);
      setPage(1);
      mutateList();
      toast.success("Experience shared successfully!", {
        description: "Thank you for sharing your story.",
      });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to share experience");
      throw err;
    }
  };

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRetry = () => {
    mutateList();
  };

  return (
    <div className="min-h-screen bg-gradient-animated flex flex-col">
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

      <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
        <div className="space-y-8">
          <section>
            <ExperienceForm
              onSubmit={handleSubmit}
              isSubmitting={isCreating}
            />
          </section>

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

          <section>
            <SearchFilter
              onFilterChange={handleFilterChange}
              initialSearch={filters.search}
              initialSort={filters.sort}
            />
          </section>

          <section>
            <ExperienceList
              experiences={experiences}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
              currentPage={page}
              totalPages={totalPages}
              total={total}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
