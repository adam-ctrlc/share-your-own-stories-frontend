import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faInbox,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ExperienceCard } from "./ExperienceCard";
import { cn } from "@/lib/utils";

function generatePaginationItems(currentPage, totalPages) {
  const items = [];
  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  items.push(1);

  if (showEllipsisStart) {
    items.push("ellipsis-start");
  }

  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!items.includes(i)) {
      items.push(i);
    }
  }

  if (showEllipsisEnd) {
    items.push("ellipsis-end");
  }

  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
}

export function ExperienceList({
  experiences,
  isLoading,
  error,
  onRetry,
  currentPage,
  totalPages,
  total,
  onPageChange,
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
          ({total})
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

      {totalPages >= 1 && (
        <Pagination className="pt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {generatePaginationItems(currentPage, totalPages).map((item, index) => (
              <PaginationItem key={index}>
                {item === "ellipsis-start" || item === "ellipsis-end" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => onPageChange(item)}
                    isActive={currentPage === item}
                    className="cursor-pointer"
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default ExperienceList;
