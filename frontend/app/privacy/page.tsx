import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy - GhostAuditAI",
  description: "Privacy Policy for GhostAuditAI",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-6">
          <p className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to GhostAuditAI. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you as to how we look after your personal data when you visit our
              website (regardless of where you visit it from) and tell you about
              your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. The Data We Collect About You
            </h2>
            <p>
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Identity Data</strong> includes first name, last name,
                username or similar identifier.
              </li>
              <li>
                <strong>Contact Data</strong> includes billing address, email
                address and telephone numbers.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP)
                address, your login data, browser type and version.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you
                use our website, products and services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. How We Use Your Personal Data
            </h2>
            <p>
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Where we need to perform the contract we are about to enter into
                or have entered into with you.
              </li>
              <li>
                Where it is necessary for our legitimate interests (or those of
                a third party) and your interests and fundamental rights do not
                override those interests.
              </li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. Document Security & Retention
            </h2>
            <p>
              For our AI detection and humanization services, any documents you
              upload are processed securely. We do not use your proprietary
              documents to train our models without your explicit consent.
              Documents are retained only as long as necessary to provide the
              service and maintain your audit history, unless you choose to
              delete them from your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
              <strong> privacy@ghostaudit.ai</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
