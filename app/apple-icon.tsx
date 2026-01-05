import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#3B82F6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
          position: 'relative',
        }}
      >
        {/* Email envelope */}
        <div
          style={{
            width: '120px',
            height: '84px',
            background: 'white',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '108px',
              height: '72px',
              background: '#3B82F6',
              borderRadius: '4px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: '12px',
            }}
          >
            {/* Content lines */}
            <div
              style={{
                width: '48px',
                height: '4px',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '2px',
                marginBottom: '8px',
              }}
            />
            <div
              style={{
                width: '72px',
                height: '4px',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '2px',
                marginBottom: '8px',
              }}
            />
            <div
              style={{
                width: '36px',
                height: '4px',
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
        
        {/* Security shield */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            background: '#10B981',
            borderRadius: '12px',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
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
