import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/common/utils/formatters";

export function ExperienceCard({ experience, className }) {
  const { id, content, createdAt, views = 0 } = experience;

  return (
    <Link to={`/experience/${id}`} className="block">
      <Card
        className={cn(
          "glass border-border/30 transition-all duration-300 cursor-pointer",
          "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
          "hover:translate-y-[-2px]",
          className
        )}
      >
        <CardContent className="pt-6">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap break-words line-clamp-4">
            {content}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                <time dateTime={createdAt}>
                  {formatRelativeTime(createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faEye} className="h-3 w-3" />
                <span>
                  {views.toLocaleString()} {views <= 1 ? "view" : "views"}
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-primary/70 hover:text-primary">
              Read more
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ExperienceCard;
