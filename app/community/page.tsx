import { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '../components/MaterialIcon'

export const metadata: Metadata = {
  title: 'Privacy Community Forum | OneTimeEmail Expert Q&A',
  description: 'Join our privacy community forum. Get expert answers, share experiences, and learn from fellow privacy advocates. Moderated by cybersecurity professionals.',
  keywords: ['privacy community', 'security forum', 'expert Q&A', 'privacy discussion', 'cybersecurity community', 'digital privacy help'],
}

export default function CommunityPage() {
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
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 rounded-full p-4">
              <MaterialIcon icon="forum" size="xl" className="text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Community Forum
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Connect with privacy experts and fellow advocates. Get answers to your questions, share experiences, 
            and learn from real-world privacy implementations. Moderated by cybersecurity professionals.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <span className="flex items-center gap-2">
              <MaterialIcon icon="verified_user" size="small" className="text-blue-500" />
              Expert Moderated
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="group" size="small" className="text-green-500" />
              5,000+ Members
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="chat" size="small" className="text-purple-500" />
              Active Discussions
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#ask-experts"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MaterialIcon icon="help" className="text-white" />
              <span>Ask Experts</span>
            </Link>
            
            <Link 
              href="#recent-discussions"
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MaterialIcon icon="forum" className="text-purple-600" />
              <span>Browse Discussions</span>
            </Link>
          </div>
        </header>

        {/* Community Stats */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">5,247</div>
                <div className="text-gray-600">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1,832</div>
                <div className="text-gray-600">Questions Answered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Expert Response Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                <div className="text-gray-600">Average Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Q&A Section */}
        <section id="ask-experts" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ask Our Experts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized advice from cybersecurity professionals and privacy advocates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ask Question Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon icon="help_outline" size="large" className="text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Ask a Question</h3>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Question Category
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Email Security & Privacy</option>
                    <option>Password Management</option>
                    <option>VPN & Network Security</option>
                    <option>Mobile Device Protection</option>
                    <option>Social Media Privacy</option>
                    <option>Business Security</option>
                    <option>Legal & Compliance</option>
                    <option>General Privacy Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Question
                  </label>
                  <textarea 
                    rows={6}
                    placeholder="Describe your privacy or security question in detail. Include any relevant context about your situation..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                      <input type="radio" name="experience" value="beginner" />
                      <span className="text-sm">Beginner</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                      <input type="radio" name="experience" value="intermediate" />
                      <span className="text-sm">Intermediate</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                      <input type="radio" name="experience" value="advanced" />
                      <span className="text-sm">Advanced</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MaterialIcon icon="send" size="small" />
                  <span>Submit Question</span>
                </button>
              </form>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="info" className="text-purple-600 mt-1" />
                  <div className="text-sm text-purple-800">
                    <strong>Expert Response Guarantee:</strong> All questions receive expert responses within 24 hours. 
                    Complex technical questions may be escalated to our specialist team.
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Team */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon icon="verified_user" size="large" className="text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Our Expert Team</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    DR
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dr. Sarah Richardson</h4>
                    <p className="text-blue-600 text-sm font-semibold">Lead Cybersecurity Researcher</p>
                    <p className="text-gray-600 text-sm mt-1">Former NSA • PhD Computer Security • 50+ publications</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MaterialIcon icon="verified" size="small" className="text-green-500" />
                      <span className="text-xs text-gray-500">Answers: Email Security, Encryption</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    MC
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Michael Chen</h4>
                    <p className="text-green-600 text-sm font-semibold">Privacy Law Expert</p>
                    <p className="text-gray-600 text-sm mt-1">Former EFF • Harvard Law JD • GDPR Specialist</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MaterialIcon icon="verified" size="small" className="text-green-500" />
                      <span className="text-xs text-gray-500">Answers: Legal, Compliance, Rights</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    AK
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Alex Kumar</h4>
                    <p className="text-purple-600 text-sm font-semibold">Security Architect</p>
                    <p className="text-gray-600 text-sm mt-1">MIT MS • $500K+ Bug Bounties • Open Source</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MaterialIcon icon="verified" size="small" className="text-green-500" />
                      <span className="text-xs text-gray-500">Answers: Technical, Implementation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                  <div className="text-sm text-blue-800">Questions answered by experts within 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Discussions */}
        <section id="recent-discussions" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Discussions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse active discussions and learn from community questions and expert answers
            </p>
          </div>

          <div className="space-y-6">
            {/* Discussion Thread 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="email" className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Best practices for email encryption in 2025?
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="person" size="small" />
                          PrivacySeeker42
                        </span>
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="schedule" size="small" />
                          2 hours ago
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Email Security
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">3</div>
                      <div className="text-xs text-gray-500">Expert Answers</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    I'm looking to upgrade my email security setup. Currently using Gmail with 2FA, but want to implement 
                    end-to-end encryption. What are the current best practices for email encryption, and which tools do 
                    experts recommend for both personal and business use?
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MaterialIcon icon="thumb_up" size="small" />
                        12 upvotes
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MaterialIcon icon="comment" size="small" />
                        8 replies
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        DR
                      </div>
                      <span className="text-sm text-green-600 font-semibold">Expert Answered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Thread 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="smartphone" className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Mobile privacy: iOS vs Android security comparison
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="person" size="small" />
                          TechGuardian
                        </span>
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="schedule" size="small" />
                          5 hours ago
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Mobile Security
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">2</div>
                      <div className="text-xs text-gray-500">Expert Answers</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    I'm trying to decide between iPhone and Android from a privacy perspective. I've heard conflicting 
                    information about which platform is more secure. Can experts provide an objective comparison of iOS vs 
                    Android privacy features, data collection practices, and overall security architecture?
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MaterialIcon icon="thumb_up" size="small" />
                        18 upvotes
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MaterialIcon icon="comment" size="small" />
                        15 replies
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        AK
                      </div>
                      <span className="text-sm text-green-600 font-semibold">Expert Answered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Thread 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="business" className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        GDPR compliance for small business email systems
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="person" size="small" />
                          SmallBizOwner
                        </span>
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="schedule" size="small" />
                          1 day ago
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                          Legal & Compliance
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">1</div>
                      <div className="text-xs text-gray-500">Expert Answer</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    I run a small consulting business with 8 employees. We're expanding to EU clients and need to ensure 
                    our email systems are GDPR compliant. What specific requirements do we need to meet for email data 
                    processing, storage, and client communications?
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MaterialIcon icon="thumb_up" size="small" />
                        7 upvotes
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MaterialIcon icon="comment" size="small" />
                        4 replies
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        MC
                      </div>
                      <span className="text-sm text-green-600 font-semibold">Expert Answered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/community/discussions"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <MaterialIcon icon="forum" size="small" />
              <span>View All Discussions</span>
            </Link>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Guidelines</h2>
                <p className="text-xl text-blue-100">
                  Our community thrives on respectful, helpful, and expert-backed discussions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MaterialIcon icon="thumb_up" className="text-white" />
                    <span>Do's</span>
                  </h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Ask specific, detailed questions</li>
                    <li>• Share relevant context and background</li>
                    <li>• Respect expert time and expertise</li>
                    <li>• Follow up with results and thanks</li>
                    <li>• Help others when you can</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MaterialIcon icon="block" className="text-white" />
                    <span>Don'ts</span>
                  </h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Post spam or promotional content</li>
                    <li>• Share personal sensitive information</li>
                    <li>• Ask for illegal or unethical advice</li>
                    <li>• Duplicate questions without searching</li>
                    <li>• Disrespect community members</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link 
                  href="/community/guidelines"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <MaterialIcon icon="policy" size="small" />
                  <span>Read Full Guidelines</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
