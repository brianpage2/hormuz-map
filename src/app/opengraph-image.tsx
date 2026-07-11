import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const iconData = readFileSync(join(process.cwd(), 'src/app/icon.png'))
  const iconSrc = `data:image/png;base64,${iconData.toString('base64')}`

  let fontBold: ArrayBuffer | null = null
  let fontRegular: ArrayBuffer | null = null

  try {
    const text = '호르무즈해협실시간선박추적지도AIS유조선컨테이너선위치추적hormuz.codedanswer.com·'
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    }
    const [cssBold, cssReg] = await Promise.all([
      fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`, { headers }).then((r) => r.text()),
      fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&text=${encodeURIComponent(text)}`, { headers }).then((r) => r.text()),
    ])
    const getUrl = (css: string) => css.match(/src: url\(([^)]+)\) format\('woff2'\)/)?.[1] ?? null
    ;[fontBold, fontRegular] = await Promise.all([
      getUrl(cssBold) ? fetch(getUrl(cssBold)!).then((r) => r.arrayBuffer()) : Promise.resolve(null),
      getUrl(cssReg) ? fetch(getUrl(cssReg)!).then((r) => r.arrayBuffer()) : Promise.resolve(null),
    ])
  } catch {
    // 폰트 로드 실패 시 시스템 폰트로 fallback
  }

  type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  const fonts: { name: string; data: ArrayBuffer; style: 'normal'; weight: FontWeight }[] = []
  if (fontBold) fonts.push({ name: 'Noto Sans KR', data: fontBold, style: 'normal', weight: 700 })
  if (fontRegular) fonts.push({ name: 'Noto Sans KR', data: fontRegular, style: 'normal', weight: 400 })
  const ff = fonts.length > 0 ? 'Noto Sans KR, sans-serif' : 'sans-serif'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 100px',
          fontFamily: ff,
        }}
      >
        {/* 상단 라벨: 아이콘 + 사이트명 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={52} height={52} alt="" style={{ borderRadius: 12 }} />
          <span style={{ fontSize: 30, color: '#94a3b8', fontWeight: 400 }}>
            호르무즈 해협 실시간 선박 추적 지도
          </span>
        </div>

        {/* 메인 제목 */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#f8fafc',
            textAlign: 'center',
            lineHeight: 1.3,
            marginBottom: 36,
          }}
        >
          호르무즈 실시간 선박 확인
        </div>

        {/* 도메인 */}
        <div style={{ fontSize: 30, color: '#64748b', fontFamily: 'sans-serif' }}>
          hormuz.codedanswer.com
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
