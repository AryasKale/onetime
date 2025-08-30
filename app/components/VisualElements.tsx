import React from 'react'

// Visual enhancement components for better user engagement

export function FeatureIcon({ icon, size = 'large', color = 'blue' }: { icon: string; size?: 'small' | 'medium' | 'large'; color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' }) {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  }

  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    red: 'text-red-500'
  }

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} mb-4`} role="img" aria-label={icon}>
      {icon}
    </div>
  )
}

export function StatCard({ number, label, icon, color = 'blue' }: { number: string; label: string; icon: string; color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' }) {
  const bgColors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200'
  }

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  }

  return (
    <div className={`rounded-xl p-6 border ${bgColors[color]} text-center hover:shadow-lg transition-shadow`}>
      <div className={`text-4xl mb-3 ${iconColors[color]}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  )
}

export function ProcessStep({ step, title, description, icon }: { step: number; title: string; description: string; icon: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {step}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function BenefitCard({ title, description, icon, benefits, color = 'blue' }: {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}) {
  const bgColors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200'
  }

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  }

  return (
    <div className={`rounded-xl p-6 border ${bgColors[color]} hover:shadow-lg transition-all hover:scale-105`}>
      <div className={`text-4xl mb-4 ${iconColors[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={`${iconColors[color]} text-sm mt-1`}>•</span>
            <span className="text-gray-600 text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function QuoteBlock({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border-l-4 border-blue-500 my-8">
      <blockquote className="text-lg text-gray-700 italic mb-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  )
}

export function ComparisonTable({ features }: {
  features: Array<{
    feature: string;
    oneTimeEmail: string | boolean;
    traditional: string | boolean;
    icon?: string;
  }>
}) {
  const getValueDisplay = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-green-600 font-semibold">✓</span>
      ) : (
        <span className="text-red-600 font-semibold">✗</span>
      )
    }
    return <span className="text-gray-600">{value}</span>
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
            <th className="px-6 py-4 text-center font-semibold text-gray-900">OneTimeEmail</th>
            <th className="px-6 py-4 text-center font-semibold text-gray-900">Traditional Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {feature.icon && <span className="text-xl">{feature.icon}</span>}
                  <span className="font-medium text-gray-900">{feature.feature}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                {getValueDisplay(feature.oneTimeEmail)}
              </td>
              <td className="px-6 py-4 text-center">
                {getValueDisplay(feature.traditional)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ProgressIndicator({ current, total, label }: { current: number; total: number; label: string }) {
  const percentage = (current / total) * 100

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{current} of {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function TestimonialCard({ quote, author, role, avatar }: { quote: string; author: string; role: string; avatar?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {author.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <blockquote className="text-gray-700 italic mb-3">
            "{quote}"
          </blockquote>
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InteractiveCard({ title, description, actionText, onAction, icon, color = 'blue' }: {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  icon: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}) {
  const bgColors = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    red: 'bg-red-50 border-red-200 hover:bg-red-100'
  }

  const buttonColors = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    red: 'bg-red-500 hover:bg-red-600'
  }

  return (
    <div className={`rounded-xl p-6 border ${bgColors[color]} transition-all hover:shadow-lg cursor-pointer`} onClick={onAction}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
          <button className={`px-4 py-2 ${buttonColors[color]} text-white rounded-lg font-medium transition-colors`}>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  )
}
