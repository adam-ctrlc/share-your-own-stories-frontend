import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export function TermsOfService() {
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
                  icon={faFileContract}
                  className="h-5 w-5 text-white"
                />
              </div>
              <h1 className="text-xl font-bold gradient-text">
                Terms of Service
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Terms of Service</CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Experiences ("the Service"), you accept
                and agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Description of Service
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Experiences is a platform that allows users to anonymously share
                their personal experiences with the community. The service is
                provided "as is" without requiring user registration or
                authentication.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. User Conduct
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>
                  Post content that is illegal, harmful, threatening, abusive,
                  harassing, defamatory, or otherwise objectionable
                </li>
                <li>
                  Share personal information of others without their consent
                </li>
                <li>Post spam, advertisements, or promotional content</li>
                <li>Attempt to interfere with or disrupt the Service</li>
                <li>Impersonate any person or entity</li>
                <li>
                  Post content that infringes on intellectual property rights
                </li>
                <li>Engage in any activity that could harm minors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Content Ownership & License
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                By submitting content to Experiences, you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Retain ownership of your content</li>
                <li>
                  Grant us a non-exclusive, royalty-free, worldwide license to
                  display, distribute, and store your content
                </li>
                <li>Confirm that you have the right to share this content</li>
                <li>
                  Understand that your content will be publicly visible to all
                  users
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Content Moderation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to remove any content that violates these
                terms or that we deem inappropriate at our sole discretion. We
                are not obligated to monitor all content but may do so at our
                discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Advertising
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service may display advertisements provided by third parties
                including Google AdSense. These advertisements help support the
                operation of our Service. By using our Service, you agree to the
                display of such advertisements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Disclaimer of Warranties
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE
                WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Indemnification
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Experiences and its
                operators from any claims, damages, or expenses arising from
                your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting. Your continued use
                of the Service after changes constitutes acceptance of the new
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend access to the Service immediately,
                without prior notice, for any reason, including breach of these
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                12. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with applicable laws, without regard to conflict of law
                provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                13. Contact
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, please contact us through our
                website.
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

export default TermsOfService;
