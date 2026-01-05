import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#3B82F6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
          position: 'relative',
        }}
      >
        {/* Email envelope */}
        <div
          style={{
            width: '20px',
            height: '14px',
            background: 'white',
            borderRadius: '2px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '18px',
              height: '12px',
              background: '#3B82F6',
              borderRadius: '1px',
              position: 'relative',
            }}
          >
            {/* Content lines */}
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '2px',
                width: '8px',
                height: '1px',
                background: 'rgba(255,255,255,0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '2px',
                width: '12px',
                height: '1px',
                background: 'rgba(255,255,255,0.6)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '7px',
                left: '2px',
                width: '6px',
                height: '1px',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
          </div>
        </div>
        
        {/* Security shield */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '10px',
            height: '10px',
            background: '#10B981',
            borderRadius: '2px',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '6px',
          }}
        >
          ✓
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
