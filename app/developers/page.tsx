import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Developers - Using OneTimeEmail in QA and Automation',
  description: 'Developer-friendly guide with examples for automating signups, verifications, and email testing using OneTimeEmail.',
  canonical: 'https://onetimeemail.net/developers'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Developers: Integrate Temporary Emails in QA & Automation
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Practical examples for using temporary emails in CI, end-to-end tests, and local QA workflows.
          </p>
          <div className="mt-4 text-sm text-gray-500">Updated August 2025 • 10 min read</div>
        </header>

        <main className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Playbook</h2>
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-200 shadow-xl">
              <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                <li>Generate a temp address before each test</li>
                <li>Run signup or verification flow against your app</li>
                <li>Poll the inbox page for expected email arrival</li>
                <li>Parse links or codes and complete flows</li>
                <li>Let the inbox auto-expire after 10 minutes</li>
              </ol>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Example: Cypress E2E</h2>
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-200 shadow-xl">
              <pre className="overflow-auto text-sm"><code>{`// cypress/e2e/signup.cy.ts
describe('Signup with temporary email', () => {
  it('completes signup and verifies email', () => {
    // 1) Visit OneTimeEmail to generate inbox
    cy.visit('https://onetimeemail.net');
    cy.contains('Generate Your Inbox').click();

    // 2) Capture generated address from the UI (example selector)
    cy.get('[data-testid="generated-email"]').invoke('text').as('tempEmail');

    // 3) Use it to sign up in your app
    cy.get('@tempEmail').then((email) => {
      cy.visit('https://yourapp.example.com/signup');
      cy.get('input[name="email"]').type(email as string);
      cy.get('input[name="password"]').type('StrongPassword123!');
      cy.contains('Create account').click();
    });

    // 4) Return to inbox and wait for email
    cy.contains('Inbox').click();
    cy.contains('Verification').should('be.visible');

    // 5) Open email and click verify link
    cy.contains('Verification').click();
    cy.get('a').contains('Verify').then(($a) => {
      const href = $a.prop('href');
      cy.visit(href as string);
    });
  });
});`}</code></pre>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CI Tips</h2>
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-200 shadow-xl">
              <ul className="space-y-3 text-gray-700">
                <li>• Run tests serially for email flows to avoid timing conflicts</li>
                <li>• Use unique test IDs per run to disambiguate inboxes</li>
                <li>• Store verification links in CI logs for debugging</li>
                <li>• Add retries with exponential backoff when polling inbox</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Start Testing Now</h3>
              <p className="opacity-90 mb-4">Generate an inbox and wire it into your test flows.</p>
              <Link href="/" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Generate an Email
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}


