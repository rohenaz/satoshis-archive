export default function TermsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Terms of Service</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By using Satoshi's Archive ("the Software"), you agree to these Terms of Service.
              If you do not agree, do not use the Software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Nature of the Software</h2>
            <p>
              Satoshi's Archive is a <strong>client-side software tool</strong> that runs entirely
              in your web browser. The Software enables you to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Search Anna's Archive using your own API key</li>
              <li>Create blockchain transactions to store document metadata</li>
              <li>Interact with third-party services (Anna's Archive, BSV blockchain)</li>
            </ul>
            <p className="mt-3">
              <strong>The platform owner does not</strong>:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Store, cache, or proxy any content from Anna's Archive</li>
              <li>Provide API keys or access to Anna's Archive</li>
              <li>Host, transmit, or facilitate access to any documents</li>
              <li>Track, log, or have knowledge of your activities</li>
              <li>Operate servers that process your requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
            <p>
              <strong>You are solely responsible for</strong>:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Obtaining your own Anna's Archive API key</strong> and complying with
                their terms of service
              </li>
              <li>
                <strong>Ensuring legal compliance</strong> - You must verify you have the legal
                right to access, download, and store any content on the blockchain
              </li>
              <li>
                <strong>Copyright compliance</strong> - Do not store copyrighted material without
                proper authorization
              </li>
              <li>
                <strong>Blockchain transactions</strong> - All fees, transaction costs, and
                consequences of on-chain activity
              </li>
              <li>
                <strong>Your own actions</strong> - The platform owner has no control over or
                knowledge of how you use the Software
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Liability Disclaimer</h2>
            <p className="font-semibold">
              THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
            </p>
            <p className="mt-3">
              The platform owner is not liable for:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your use or misuse of the Software</li>
              <li>Any copyright infringement or legal violations you commit</li>
              <li>Actions taken by third parties (Anna's Archive, blockchain networks)</li>
              <li>Loss of data, funds, or access</li>
              <li>Any damages arising from your use of the Software</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless the platform owner from any claims,
              damages, or expenses arising from your use of the Software, including but not
              limited to copyright infringement claims.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. No Endorsement of Infringement</h2>
            <p>
              The Software is designed for legitimate uses including:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Preserving public domain works</li>
              <li>Storing Creative Commons licensed content</li>
              <li>Archiving personal documents</li>
              <li>Academic research with proper permissions</li>
            </ul>
            <p className="mt-3">
              <strong>The Software does not endorse, encourage, or facilitate copyright
              infringement.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Third-Party Services</h2>
            <p>
              Your use of Anna's Archive, BSV blockchain, and wallet providers is governed
              by their respective terms of service. The platform owner is not responsible
              for third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Termination</h2>
            <p>
              Since this is client-side software with no user accounts, there is nothing to
              terminate. You may stop using the Software at any time. Clear your browser's
              localStorage to remove your API key.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction where the platform
              owner resides. Any disputes shall be resolved in that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to Terms</h2>
            <p>
              The platform owner may update these Terms at any time. Continued use of the
              Software constitutes acceptance of updated Terms.
            </p>
          </section>

          <section className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-300 dark:border-yellow-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">⚠️ Important Legal Notice</h2>
            <p className="font-semibold">
              By using this Software, you acknowledge that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
              <li>
                You have read and understood these Terms
              </li>
              <li>
                You accept full legal responsibility for your actions
              </li>
              <li>
                You will comply with all applicable copyright laws
              </li>
              <li>
                The platform owner has no knowledge of or control over your activities
              </li>
              <li>
                You cannot hold the platform owner liable for your use of the Software
              </li>
            </ul>
          </section>

          <div className="text-sm text-gray-500 pt-8">
            <p>Last Updated: December 25, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
