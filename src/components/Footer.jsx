import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCopyright } from "@fortawesome/free-regular-svg-icons";

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-6 mt-16">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <FontAwesomeIcon icon={faCircle} className="h-1 w-1" />
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
        <p className="flex items-center justify-center gap-1 text-xs opacity-60">
          <FontAwesomeIcon icon={faCopyright} className="h-3 w-3" />
          {new Date().getFullYear()} Experiences. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
