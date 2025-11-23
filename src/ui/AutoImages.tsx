import Image from 'next/image'
import React from 'react'

interface AutoImageProps {
  src: string
  alt: string
  className?: string
  maxHeight?: number
  maxWidth?: number
  priority?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

/**
 * AutoImage - A wrapper for Next.js Image that maintains aspect ratio
 * and displays images in their natural form
 */
const AutoImage = ({ 
  src, 
  alt, 
  className = '', 
  maxHeight = 300,
  maxWidth = 300,
  priority = false,
  objectFit = 'contain'
}: AutoImageProps) => {
  return (
    <div className={`relative ${className}`} style={{ maxHeight: `${maxHeight}px`, maxWidth: `${maxWidth}px` }}>
      <Image 
        src={src}
        alt={alt}
        width={maxWidth}
        height={maxHeight}
        className={`w-auto h-auto max-w-full max-h-full object-${objectFit}`}
        priority={priority}
      />
    </div>
  )
}

export default AutoImage