import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service - GhostAuditAI",
  description: "Terms of Service for GhostAuditAI",
};

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-6">
          <p className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using GhostAuditAI, you agree to be bound by these
              Terms of Service. If you disagree with any part of the terms, then
              you may not access the service. These terms apply to all visitors,
              users, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on GhostAuditAI's website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on GhostAuditAI's website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. Fair Use & Account Responsibility
            </h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our Service.
            </p>
            <p className="mt-4">
              You are responsible for safeguarding the password that you use to
              access the Service and for any activities or actions under your
              password. Automated abuse, unnatural bulk uploading, or efforts to
              reverse engineer our detection engine will result in an immediate
              ban.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. Limitations
            </h2>
            <p>
              In no event shall GhostAuditAI or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on GhostAuditAI's website, even
              if GhostAuditAI or a Cloud authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. Revisions and Errata
            </h2>
            <p>
              The materials appearing on GhostAuditAI's website could include
              technical, typographical, or photographic errors. GhostAuditAI
              does not warrant that any of the materials on its website are
              accurate, complete or current. We may make changes to the
              materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              6. Contact
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <strong> legal@ghostaudit.ai</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
