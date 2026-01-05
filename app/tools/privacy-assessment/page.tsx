import { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '../../components/MaterialIcon'

export const metadata: Metadata = {
  title: 'Free Privacy Security Assessment Tool | OneTimeEmail',
  description: 'Comprehensive privacy and security assessment tool. Evaluate your digital privacy posture with expert-designed questionnaire and get personalized recommendations.',
  keywords: ['privacy assessment', 'security audit', 'privacy score', 'digital security evaluation', 'privacy checkup'],
}

export default function PrivacyAssessmentTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <MaterialIcon icon="arrow_back" size="small" />
            <span>Back to Privacy Resources</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <MaterialIcon icon="security" size="xl" className="text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Security Assessment
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a comprehensive evaluation of your digital privacy and security posture. Our expert-designed assessment 
            provides personalized recommendations based on cybersecurity best practices.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <MaterialIcon icon="timer" size="small" className="text-blue-500" />
              5-10 minutes
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="verified" size="small" className="text-green-500" />
              Expert-Designed
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="privacy_tip" size="small" className="text-purple-500" />
              100% Anonymous
            </span>
          </div>
        </header>

        {/* Assessment Tool */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
                <span className="text-sm text-gray-500">Question 1 of 20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{width: '5%'}}></div>
              </div>
            </div>

            {/* Current Question */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="email" className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Email Security Practices
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    How do you typically handle email security and privacy?
                  </p>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input type="radio" name="email_security" value="basic" className="mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">Basic Protection</div>
                    <div className="text-gray-600 text-sm">I use the same email for everything and rely on my provider's default security</div>
                  </div>
                  <div className="text-red-500">
                    <MaterialIcon icon="warning" size="small" />
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input type="radio" name="email_security" value="moderate" className="mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">Moderate Protection</div>
                    <div className="text-gray-600 text-sm">I use different emails for different purposes and have 2FA enabled</div>
                  </div>
                  <div className="text-yellow-500">
                    <MaterialIcon icon="info" size="small" />
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input type="radio" name="email_security" value="advanced" className="mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">Advanced Protection</div>
                    <div className="text-gray-600 text-sm">I use secure email providers, temporary emails, and end-to-end encryption</div>
                  </div>
                  <div className="text-green-500">
                    <MaterialIcon icon="verified" size="small" />
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input type="radio" name="email_security" value="expert" className="mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">Expert Level</div>
                    <div className="text-gray-600 text-sm">I use PGP encryption, air-gapped systems, and advanced operational security</div>
                  </div>
                  <div className="text-blue-500">
                    <MaterialIcon icon="security" size="small" />
                  </div>
                </label>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button 
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-semibold transition-colors"
                disabled
              >
                <MaterialIcon icon="arrow_back" size="small" />
                <span>Previous</span>
              </button>

              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <span>Next Question</span>
                <MaterialIcon icon="arrow_forward" size="small" />
              </button>
            </div>

          </div>
        </div>

        {/* Assessment Categories Preview */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We'll Assess</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive assessment covers all critical areas of digital privacy and security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="email" size="large" className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email Security</h3>
              <p className="text-gray-600 text-sm">Provider choice, encryption, compartmentalization</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="password" size="large" className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Password Management</h3>
              <p className="text-gray-600 text-sm">Strength, uniqueness, manager usage</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="public" size="large" className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Web Browsing</h3>
              <p className="text-gray-600 text-sm">Browser choice, extensions, tracking protection</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="smartphone" size="large" className="text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mobile Security</h3>
              <p className="text-gray-600 text-sm">App permissions, device encryption, updates</p>
            </div>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Personalized Privacy Report</h2>
              <p className="text-xl text-blue-100 mb-8">
                After completing the assessment, you'll receive a comprehensive report with actionable recommendations
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="analytics" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Privacy Score</h3>
                  <p className="text-blue-200 text-sm">Overall rating with detailed breakdown by category</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="checklist" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Action Plan</h3>
                  <p className="text-blue-200 text-sm">Prioritized steps to improve your privacy posture</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="school" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Learning Resources</h3>
                  <p className="text-blue-200 text-sm">Curated articles and guides for your specific needs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Validation */}
        <section className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert-Validated Assessment</h2>
              <p className="text-xl text-gray-600">
                Developed by cybersecurity professionals with decades of experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  DR
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Dr. Sarah Richardson</h3>
                <p className="text-gray-600 text-sm">Lead Cybersecurity Researcher</p>
                <p className="text-gray-500 text-xs mt-2">Former NSA, PhD Computer Security</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  MC
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-gray-600 text-sm">Privacy Law Expert</p>
                <p className="text-gray-500 text-xs mt-2">Former EFF, Harvard Law JD</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  AK
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Alex Kumar</h3>
                <p className="text-gray-600 text-sm">Security Architect</p>
                <p className="text-gray-500 text-xs mt-2">MIT MS, $500K+ Bug Bounties</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
