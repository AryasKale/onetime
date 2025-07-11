import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'How It Works - OneTimeEmail Step-by-Step Guide',
  description: 'Learn how OneTimeEmail temporary email service works. Complete step-by-step guide to generating, using, and managing disposable email addresses safely.',
  canonical: 'https://onetimeemail.net/how-it-works'
})

export const viewport: Viewport = generateAdvancedViewport()

interface StepProps {
  number: number
  title: string
  description: string
  details: string[]
  icon: string
}

function Step({ number, title, description, details, icon }: StepProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
      <div className="flex items-start gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">{description}</p>
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <span className="text-green-500 mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Generate Your Temporary Email",
      description: "Click the 'Generate Your Inbox' button to instantly create a secure temporary email address.",
      details: [
        "No registration or personal information required",
        "Email address is randomly generated for maximum security",
        "Address format: 6 random characters @onetimeemail.net",
        "Instant generation - takes less than 1 second",
        "Each email address is unique and never reused"
      ],
      icon: "🚀"
    },
    {
      number: 2,
      title: "Use Your Temporary Email",
      description: "Copy the generated email address and use it for registrations, signups, or any service that requires an email.",
      details: [
        "Perfect for website registrations and app signups",
        "Use for free trials and software downloads",
        "Great for accessing gated content or resources",
        "Ideal for testing websites and applications",
        "Works with newsletter subscriptions and promotions"
      ],
      icon: "📋"
    },
    {
      number: 3,
      title: "Receive Emails Instantly",
      description: "Watch your temporary inbox for incoming emails. Messages appear in real-time as they arrive.",
      details: [
        "Real-time email delivery and display",
        "No delays - emails appear within seconds",
        "View email content, sender, subject, and timestamp",
        "Support for both HTML and plain text emails",
        "Automatic refresh to show new messages"
      ],
      icon: "📨"
    },
    {
      number: 4,
      title: "Auto-Expiration & Cleanup",
      description: "After 10 minutes, your temporary email and all received messages are automatically deleted for your privacy.",
      details: [
        "Automatic deletion after exactly 10 minutes",
        "All email content permanently removed",
        "No traces left in our system",
        "Ensures maximum privacy protection",
        "Generate new emails anytime as needed"
      ],
      icon: "🗑️"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How OneTimeEmail Works
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Learn how our temporary email service protects your privacy in just 4 simple steps. 
            No registration required, completely free, and your data is never stored.
          </p>
        </header>

        <main>
          {/* Quick Overview */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">The Complete Process</h2>
              <p className="text-xl mb-8 opacity-90">
                From email generation to automatic deletion - everything happens seamlessly
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold mb-1">Instant</h3>
                  <p className="text-sm opacity-80">Generate emails in &lt;1 second</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-semibold mb-1">Secure</h3>
                  <p className="text-sm opacity-80">End-to-end encryption</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">🚫</div>
                  <h3 className="font-semibold mb-1">No Tracking</h3>
                  <p className="text-sm opacity-80">Zero data collection</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl mb-2">🆓</div>
                  <h3 className="font-semibold mb-1">Free</h3>
                  <p className="text-sm opacity-80">Always completely free</p>
                </div>
              </div>
            </div>
          </section>

          {/* Step-by-Step Process */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Step-by-Step Guide
            </h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Step key={index} {...step} />
              ))}
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Behind the Scenes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span>⚙️</span> Technical Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Random Generation</h4>
                      <p className="text-gray-600 text-sm">Cryptographically secure random string generation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Database Storage</h4>
                      <p className="text-gray-600 text-sm">Encrypted temporary storage in secure database</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Routing</h4>
                      <p className="text-gray-600 text-sm">Mailgun routes incoming emails to your inbox</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Auto Cleanup</h4>
                      <p className="text-gray-600 text-sm">Automated deletion after 10-minute expiration</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span>🔐</span> Security Features
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">HTTPS Encryption</h4>
                    <p className="text-gray-600 text-sm">All communications protected with TLS 1.3 encryption</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Rate Limiting</h4>
                    <p className="text-gray-600 text-sm">Protection against spam and abuse with intelligent limits</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Content Filtering</h4>
                    <p className="text-gray-600 text-sm">Automatic detection and blocking of malicious content</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Secure Deletion</h4>
                    <p className="text-gray-600 text-sm">Cryptographic erasure ensures data cannot be recovered</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Common Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🛒",
                  title: "Online Shopping",
                  description: "Sign up for e-commerce sites without spam",
                  examples: ["Product reviews", "Delivery notifications", "Order confirmations"]
                },
                {
                  icon: "🆓",
                  title: "Free Trials",
                  description: "Access software trials and services",
                  examples: ["Software downloads", "App trials", "Service testing"]
                },
                {
                  icon: "📰",
                  title: "Content Access",
                  description: "Access gated content and resources",
                  examples: ["News articles", "Research papers", "Download links"]
                },
                {
                  icon: "🧪",
                  title: "Testing & Development",
                  description: "Test email functionality in applications",
                  examples: ["API testing", "Form validation", "Email workflows"]
                },
                {
                  icon: "🎫",
                  title: "Event Registration",
                  description: "Register for events and webinars",
                  examples: ["Conference tickets", "Webinar access", "Event updates"]
                },
                {
                  icon: "🎓",
                  title: "Educational Resources",
                  description: "Access learning materials and courses",
                  examples: ["Online courses", "Educational content", "Certification programs"]
                }
              ].map((useCase, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {useCase.examples.map((example, i) => (
                      <li key={i}>• {example}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Tips & Best Practices */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Tips & Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span>💡</span> Pro Tips
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Keep the tab open</h4>
                      <p className="text-gray-600 text-sm">Keep your inbox tab open while waiting for emails</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Copy important info</h4>
                      <p className="text-gray-600 text-sm">Save any important information before the 10-minute expiration</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Use for one-time needs</h4>
                      <p className="text-gray-600 text-sm">Perfect for registrations you won't need long-term access to</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Generate multiple emails</h4>
                      <p className="text-gray-600 text-sm">Create separate emails for different services if needed</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span>⚠️</span> What to Avoid
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Financial accounts</h4>
                      <p className="text-gray-600 text-sm">Don't use for banking, payments, or important accounts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Long-term services</h4>
                      <p className="text-gray-600 text-sm">Avoid for accounts you'll need to access regularly</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Password recovery</h4>
                      <p className="text-gray-600 text-sm">Don't rely on temporary emails for password resets</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sensitive communications</h4>
                      <p className="text-gray-600 text-sm">Avoid for confidential or sensitive information</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Get Started CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-6 opacity-90">
                Generate your first temporary email address in seconds
              </p>
              <Link 
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Generate Your Email Now
              </Link>
            </div>
          </section>
        </main>


      </div>
    </div>
  )
} 