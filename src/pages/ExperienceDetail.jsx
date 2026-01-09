import { toPng } from "html-to-image";
import download from "downloadjs";
import {
  faArrowLeft,
  faSpinner,
  faShareNodes,
  faCircleExclamation,
  faDownload,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { experienceApi } from "@/common/libs/api";
import { formatRelativeTime } from "@/common/utils/formatters";
import { toast, Toaster } from "sonner";
import { Footer } from "@/components/Footer";

export function ExperienceDetail() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastFetchedId = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    async function fetchExperience() {
      if (lastFetchedId.current === id) return;
      lastFetchedId.current = id;

      try {
        setIsLoading(true);
        setError(null);
        const result = await experienceApi.getById(id);
        setExperience(result.data);
      } catch (err) {
        setError(err.message || "Failed to load experience");
        lastFetchedId.current = null;
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchExperience();
    }
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared Experience",
          text: experience?.content?.slice(0, 100) + "...",
          url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href);
  };

  const handleExportPng = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        width: 672,
        style: {
          width: "672px",
          minWidth: "672px",
          maxWidth: "672px",
        },
        backgroundColor: "transparent",
        pixelRatio: 2,
      });
      download(dataUrl, `experience-${id}.png`);
      toast.success("Experience exported successfully!");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export image.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-animated flex flex-col">
      <Toaster position="top-center" richColors />

      <header className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Experiences</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
            {experience && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportPng}>
                  <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export PNG</span>
                  <span className="sm:hidden">Export</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyLink}>
                  <FontAwesomeIcon icon={faLink} className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Copy Link</span>
                  <span className="sm:hidden">Copy</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <FontAwesomeIcon
                    icon={faShareNodes}
                    className="h-4 w-4 mr-2"
                  />
                  <span className="hidden sm:inline">Share</span>
                  <span className="sm:hidden">Share</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <FontAwesomeIcon
              icon={faSpinner}
              className="h-8 w-8 animate-spin text-primary"
            />
            <p className="mt-4 text-sm">Loading experience...</p>
          </div>
        )}

        {error && (
          <Card className="glass border-destructive/50">
            <CardContent className="py-12 text-center">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="h-12 w-12 text-destructive mb-4"
              />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Experience Not Found
              </h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {experience && !isLoading && (
          <div ref={cardRef}>
            <Card className="glass border-border/50">
              <CardContent className="pt-8 pb-6">
                <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {experience.content}
                </p>
                <div className="mt-6 pt-4 border-t border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                      <time dateTime={experience.createdAt}>
                        {formatRelativeTime(experience.createdAt)}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      <span>
                        {experience.views?.toLocaleString() || 0}{" "}
                        {(experience.views || 0) <= 1 ? "view" : "views"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono break-all">
                    #{experience.id}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ExperienceDetail;
