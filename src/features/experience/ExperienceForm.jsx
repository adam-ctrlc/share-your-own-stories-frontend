import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { validateExperience } from "@/common/utils/validation";

const MAX_LENGTH = 2000;
const MIN_LENGTH = 50;
const STORAGE_KEY = "experience-draft";

export function ExperienceForm({ onSubmit, isSubmitting = false }) {
  const [content, setContent] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) || "";
    }
    return "";
  });
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const formLoadTime = useRef(Date.now());
  const honeypotRef = useRef({ website: "", email: "", phone: "" });

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, content);
  }, [content]);

  const charCount = content.length;
  const isNearLimit = charCount > MAX_LENGTH * 0.9;
  const isOverLimit = charCount > MAX_LENGTH;

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);

    if (touched) {
      const validation = validateExperience(value);
      setError(validation.success ? "" : validation.error || "");
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validation = validateExperience(content);
    setError(validation.success ? "" : validation.error || "");
  };

  const handleHoneypotChange = (field) => (e) => {
    honeypotRef.current[field] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    const validation = validateExperience(content);
    if (!validation.success) {
      setError(validation.error || "Invalid content");
      return;
    }

    const timeSpent = Date.now() - formLoadTime.current;

    try {
      await onSubmit({
        content: validation.data,
        website: honeypotRef.current.website,
        email: honeypotRef.current.email,
        phone: honeypotRef.current.phone,
        _t: timeSpent,
      });
      setContent("");
      honeypotRef.current = { website: "", email: "", phone: "" };
      formLoadTime.current = Date.now();
      localStorage.removeItem(STORAGE_KEY);
      setError("");
      setTouched(false);
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
    }
  };

  const honeypotStyles = {
    position: "absolute",
    left: "-9999px",
    top: "-9999px",
    opacity: 0,
    height: 0,
    width: 0,
    overflow: "hidden",
    pointerEvents: "none",
  };

  return (
    <Card className="glass border-border/50 shadow-xl shadow-primary/5">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold gradient-text">
          Share Your Experience
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Tell the world about something meaningful you&apos;ve experienced
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div style={honeypotStyles} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              onChange={handleHoneypotChange("website")}
              tabIndex={-1}
              autoComplete="off"
            />
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              onChange={handleHoneypotChange("email")}
              tabIndex={-1}
              autoComplete="off"
            />
            <label htmlFor="phone_number">Phone</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              onChange={handleHoneypotChange("phone")}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="experience-content" className="sr-only">
              Your experience
            </label>
            <div className="relative">
              <Textarea
                id="experience-content"
                name="content"
                value={content}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Share your experience here... What happened? How did it make you feel? What did you learn?"
                rows={5}
                maxLength={MAX_LENGTH + 100}
                disabled={isSubmitting}
                aria-invalid={!!error}
                aria-describedby={error ? "experience-error" : undefined}
                className={cn(
                  "resize-none text-base transition-all duration-200",
                  "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  error &&
                    "border-destructive focus:ring-destructive/20 focus:border-destructive"
                )}
              />
              <div
                className={cn(
                  "absolute bottom-3 right-3 text-xs font-medium transition-colors",
                  isOverLimit
                    ? "text-destructive"
                    : isNearLimit
                    ? "text-amber-400"
                    : "text-muted-foreground"
                )}
              >
                {charCount.toLocaleString()}/{MAX_LENGTH.toLocaleString()}
              </div>
            </div>

            {error && (
              <p
                id="experience-error"
                role="alert"
                className="flex items-center gap-2 text-sm text-destructive animate-in fade-in slide-in-from-top-1"
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="h-4 w-4"
                />
                {error}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Minimum {MIN_LENGTH} characters required
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || isOverLimit || charCount < MIN_LENGTH}
            className={cn(
              "w-full font-semibold transition-all duration-300",
              "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90",
              "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
              "disabled:opacity-50 disabled:shadow-none"
            )}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="h-4 w-4 animate-spin"
                />
                Sharing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
                Share Experience
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ExperienceForm;
