import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export function PrivacyPolicy() {
  const lastUpdated = "January 9, 2026";

  return (
    <div className="min-h-screen bg-gradient-animated flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="h-5 w-5 text-white"
                />
              </div>
              <h1 className="text-xl font-bold gradient-text">
                Privacy Policy
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Experiences ("we," "our," or "us"). We respect your
                privacy and are committed to protecting your personal data. This
                privacy policy explains how we collect, use, and safeguard your
                information when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect minimal information to provide our service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">
                    Experience Content:
                  </strong>{" "}
                  The text you submit when sharing an experience
                </li>
                <li>
                  <strong className="text-foreground">
                    IP Address (Hashed):
                  </strong>{" "}
                  We store a hashed (anonymized) version of your IP address
                  solely for rate limiting purposes. We cannot identify you from
                  this hash.
                </li>
                <li>
                  <strong className="text-foreground">Timestamps:</strong> When
                  experiences are submitted
                </li>
                <li>
                  <strong className="text-foreground">Cookies:</strong> We use
                  essential cookies and third-party advertising cookies (see
                  Advertising section)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use collected information for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Displaying submitted experiences to all users</li>
                <li>Preventing spam and abuse through rate limiting</li>
                <li>Improving and maintaining our service</li>
                <li>Displaying relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Advertising
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use Google AdSense to display advertisements. Google may use
                cookies and web beacons to collect information about your visits
                to this and other websites to provide targeted advertisements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Ads Settings
                </a>{" "}
                or{" "}
                <a
                  href="https://optout.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  aboutads.info
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Data Storage & Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your data.
                Experience content is stored in our secure database. IP
                addresses are hashed using SHA-256 before storage, making it
                impossible to reverse-engineer your actual IP address.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Submitted experiences are retained indefinitely to maintain the
                community archive. Hashed IP addresses are retained for rate
                limiting purposes. You may request deletion of your submitted
                content by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of personalized advertising</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy, please contact
                us through our website.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
