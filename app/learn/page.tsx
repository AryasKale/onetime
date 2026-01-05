import { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '../components/MaterialIcon'

export const metadata: Metadata = {
  title: 'Privacy & Security Learning Center | OneTimeEmail Academy',
  description: 'Comprehensive privacy and security education center. Learn from cybersecurity experts through courses, tutorials, and interactive content.',
  keywords: ['privacy education', 'security training', 'cybersecurity courses', 'privacy academy', 'digital security learning'],
}

export default function LearningCenter() {
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
            <div className="bg-blue-100 rounded-full p-4">
              <MaterialIcon icon="school" size="xl" className="text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy & Security Academy
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Master digital privacy and security through expert-designed courses, interactive tutorials, 
            and hands-on exercises. From beginner basics to advanced techniques.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <span className="flex items-center gap-2">
              <MaterialIcon icon="verified" size="small" className="text-green-500" />
              Expert-Designed Curriculum
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="quiz" size="small" className="text-blue-500" />
              Interactive Learning
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="workspace_premium" size="small" className="text-purple-500" />
              Completion Certificates
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#beginner-courses"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MaterialIcon icon="play_arrow" className="text-white" />
              <span>Start Learning</span>
            </Link>
            
            <Link 
              href="/tools/privacy-assessment"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MaterialIcon icon="assessment" className="text-blue-600" />
              <span>Take Assessment</span>
            </Link>
          </div>
        </header>

        {/* Learning Paths */}
        <section id="beginner-courses" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured learning paths designed for different experience levels and goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Beginner Path */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="school" size="xl" className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Beginner Path</h3>
                <p className="text-gray-600">Perfect for privacy newcomers</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Privacy Fundamentals</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Email Security Basics</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Password Management</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Safe Browsing Practices</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">4 Courses</div>
                <div className="text-gray-600">~6 hours total</div>
              </div>

              <Link 
                href="/learn/beginner"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Beginner Path
              </Link>
            </div>

            {/* Intermediate Path */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-500 hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="trending_up" size="xl" className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Intermediate Path</h3>
                <p className="text-gray-600">For those with basic knowledge</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-blue-500" />
                  <span className="text-gray-700">Advanced Email Security</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-blue-500" />
                  <span className="text-gray-700">VPN & Network Security</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-blue-500" />
                  <span className="text-gray-700">Mobile Device Protection</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-blue-500" />
                  <span className="text-gray-700">Social Media Privacy</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">6 Courses</div>
                <div className="text-gray-600">~12 hours total</div>
              </div>

              <Link 
                href="/learn/intermediate"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Intermediate Path
              </Link>
            </div>

            {/* Advanced Path */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="military_tech" size="xl" className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Path</h3>
                <p className="text-gray-600">Professional-level techniques</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Encryption & Cryptography</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Operational Security</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Threat Modeling</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Digital Forensics</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">8 Courses</div>
                <div className="text-gray-600">~20 hours total</div>
              </div>

              <Link 
                href="/learn/advanced"
                className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Advanced Path
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and highly-rated courses, updated regularly with the latest techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="email" size="large" className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Email Privacy Mastery</h3>
                  <p className="text-gray-600">Master every aspect of email security and privacy protection</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="schedule" size="small" className="text-gray-400" />
                  <span className="text-gray-600">4.5 hours • 12 lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="star" size="small" className="text-yellow-500" />
                  <span className="text-gray-600">4.9/5 rating • 2,847 students</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="trending_up" size="small" className="text-green-500" />
                  <span className="text-gray-600">Intermediate Level</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Advanced email encryption techniques</li>
                  <li>• Secure email provider selection</li>
                  <li>• Email compartmentalization strategies</li>
                  <li>• Threat detection and response</li>
                </ul>
              </div>

              <Link 
                href="/learn/courses/email-privacy-mastery"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Course
              </Link>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="shield" size="large" className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Digital Identity Protection</h3>
                  <p className="text-gray-600">Comprehensive guide to protecting your digital identity</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="schedule" size="small" className="text-gray-400" />
                  <span className="text-gray-600">6 hours • 15 lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="star" size="small" className="text-yellow-500" />
                  <span className="text-gray-600">4.8/5 rating • 1,923 students</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="trending_up" size="small" className="text-blue-500" />
                  <span className="text-gray-600">Beginner to Intermediate</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Identity theft prevention</li>
                  <li>• Social media privacy settings</li>
                  <li>• Data broker opt-out strategies</li>
                  <li>• Personal information management</li>
                </ul>
              </div>

              <Link 
                href="/learn/courses/digital-identity-protection"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Course
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Features */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Interactive Learning Experience</h2>
              <p className="text-xl text-purple-100 mb-8">
                Learn through hands-on exercises, real-world simulations, and interactive assessments
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="quiz" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Interactive Quizzes</h3>
                  <p className="text-purple-200 text-sm">Test your knowledge with scenario-based questions</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="science" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Hands-On Labs</h3>
                  <p className="text-purple-200 text-sm">Practice techniques in safe, simulated environments</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="workspace_premium" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Certificates</h3>
                  <p className="text-purple-200 text-sm">Earn verifiable certificates for completed courses</p>
                </div>
              </div>

              <Link 
                href="/tools/privacy-assessment"
                className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                <MaterialIcon icon="assessment" />
                <span>Try Interactive Assessment</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Progress Tracking */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Track Your Progress</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor your learning journey with detailed progress tracking and personalized recommendations
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Dashboard</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Email Security Mastery</span>
                      <span className="text-blue-600 font-bold">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Digital Identity Protection</span>
                      <span className="text-green-600 font-bold">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Advanced Cryptography</span>
                      <span className="text-orange-600 font-bold">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-500 h-3 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <MaterialIcon icon="email" size="large" className="text-blue-600 mb-2" />
                    <div className="font-bold text-gray-900">Email Expert</div>
                    <div className="text-gray-600 text-sm">Completed all email courses</div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <MaterialIcon icon="quiz" size="large" className="text-green-600 mb-2" />
                    <div className="font-bold text-gray-900">Quiz Master</div>
                    <div className="text-gray-600 text-sm">100% on 10 quizzes</div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <MaterialIcon icon="schedule" size="large" className="text-purple-600 mb-2" />
                    <div className="font-bold text-gray-900">Consistent Learner</div>
                    <div className="text-gray-600 text-sm">7-day learning streak</div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 text-center border-2 border-dashed border-orange-300">
                    <MaterialIcon icon="lock" size="large" className="text-gray-400 mb-2" />
                    <div className="font-bold text-gray-500">Advanced Scholar</div>
                    <div className="text-gray-400 text-sm">Complete 5 more courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
