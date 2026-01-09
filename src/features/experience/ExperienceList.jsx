import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faInbox,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ExperienceCard } from "./ExperienceCard";
import { cn } from "@/lib/utils";

export function ExperienceList({
  experiences,
  isLoading,
  error,
  onRetry,
  hasMore,
  onLoadMore,
  isLoadingMore,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <FontAwesomeIcon
          icon={faSpinner}
          className="h-8 w-8 animate-spin text-primary"
        />
        <p className="mt-4 text-sm">Loading experiences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <Button variant="outline" onClick={onRetry}>
          <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <FontAwesomeIcon
            icon={faInbox}
            className="h-10 w-10 text-muted-foreground"
          />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          No experiences yet
        </h3>
        <p className="text-muted-foreground mt-1">
          Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground/80">
        Recent Experiences
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({experiences.length})
        </span>
      </h2>

      <div className="grid gap-4">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            className={cn(
              "animate-in fade-in slide-in-from-bottom-2",
              { "animation-delay-100": index % 3 === 1 },
              { "animation-delay-200": index % 3 === 2 }
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="min-w-[150px]"
          >
            {isLoadingMore ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="h-4 w-4 animate-spin mr-2"
                />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ExperienceList;
