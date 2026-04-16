import { NextResponse } from "next/server";

export const revalidate = 1800; // 30분 캐시

// 호르무즈 해협 중심 좌표
const LAT = 26.5;
const LON = 56.5;

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,relative_humidity_2m` +
  `&wind_speed_unit=kn&timezone=Asia/Dubai`;

const MARINE_URL =
  `https://marine-api.open-meteo.com/v1/marine` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=wave_height,wave_direction,wave_period,wind_wave_height`;

// WMO 날씨 코드 → 한국어
function weatherLabel(code: number): string {
  if (code === 0) return "맑음";
  if (code <= 3) return "구름";
  if (code <= 48) return "안개";
  if (code <= 55) return "이슬비";
  if (code <= 65) return "비";
  if (code <= 77) return "눈";
  if (code <= 82) return "소나기";
  if (code <= 99) return "뇌우";
  return "알 수 없음";
}

// 풍향 각도 → 16방위
function windDirection(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round(deg / 22.5) % 16];
}

export type WeatherResponse = {
  temperature: number;    // °C
  windSpeed: number;      // knots
  windDirection: string;  // 16방위 (예: "SW")
  windDeg: number;        // 풍향 각도
  humidity: number;       // %
  weatherCode: number;
  weatherLabel: string;   // 한국어 날씨 설명
  waveHeight: number;     // m
  wavePeriod: number;     // s
  waveDirection: string;  // 16방위
  observedAt: string;     // 관측 시각 (ISO)
  source: string;
};

export async function GET() {
  try {
    const [weatherRes, marineRes] = await Promise.all([
      fetch(WEATHER_URL, { next: { revalidate: 1800 } }),
      fetch(MARINE_URL,  { next: { revalidate: 1800 } }),
    ]);

    if (!weatherRes.ok) throw new Error(`weather API ${weatherRes.status}`);
    if (!marineRes.ok)  throw new Error(`marine API ${marineRes.status}`);

    const weather = await weatherRes.json();
    const marine  = await marineRes.json();

    const wc = weather.current;
    const mc = marine.current;

    const body: WeatherResponse = {
      temperature:   wc.temperature_2m,
      windSpeed:     Math.round(wc.wind_speed_10m * 10) / 10,
      windDirection: windDirection(wc.wind_direction_10m),
      windDeg:       wc.wind_direction_10m,
      humidity:      wc.relative_humidity_2m,
      weatherCode:   wc.weather_code,
      weatherLabel:  weatherLabel(wc.weather_code),
      waveHeight:    Math.round(mc.wave_height * 100) / 100,
      wavePeriod:    Math.round(mc.wave_period * 10) / 10,
      waveDirection: windDirection(mc.wave_direction),
      observedAt:    wc.time,
      source:        "Open-Meteo (CC BY 4.0)",
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("[weather]", err);
    return NextResponse.json(
      { error: "기상 데이터 호출 실패" },
      { status: 502 }
    );
  }
}
