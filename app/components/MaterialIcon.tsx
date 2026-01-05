import React from 'react'

interface MaterialIconProps {
  icon: string
  className?: string
  size?: 'small' | 'medium' | 'large' | 'xl'
  variant?: 'filled' | 'outlined' | 'round' | 'sharp'
  style?: 'outlined' | 'filled' | 'round' | 'sharp'
}

const MaterialIcon: React.FC<MaterialIconProps> = ({ 
  icon, 
  className = '', 
  size = 'medium',
  variant = 'outlined',
  style = 'outlined'
}) => {
  const sizeClasses = {
    small: 'text-lg', // 18px
    medium: 'text-2xl', // 24px
    large: 'text-4xl', // 36px
    xl: 'text-6xl' // 48px
  }

  const baseClass = style === 'outlined' ? 'material-symbols-outlined' : 'material-icons'
  
  return (
    <span 
      className={`${baseClass} ${sizeClasses[size]} ${className}`}
      style={{ 
        fontVariationSettings: style === 'outlined' ? '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' : undefined 
      }}
    >
      {icon}
    </span>
  )
}

export default MaterialIcon
