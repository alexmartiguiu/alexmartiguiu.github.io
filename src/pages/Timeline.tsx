import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Papa from 'papaparse'

type TimelineRow = {
  id?: string
  type?: string
  title?: string
  subtitle?: string
  start?: string
  end?: string
  ongoing?: string
  color?: string
  link?: string
  logo?: string
  sort_order?: string
}

type TimelineItem = {
  id: string
  type: string
  title: string
  subtitle: string
  startMonth: number
  endMonth: number
  startRaw: string
  endRaw: string
  ongoing: boolean
  color: string
  link: string
  logoClass: string
  sortOrder: number
}

const FALLBACK_COLORS: Record<string, string> = {
  work: '#16a34a',
  education: '#4f46e5',
  research: '#0891b2',
  project: '#ea580c',
}

function parseYearMonth(value: string): number | null {
  const match = value.trim().match(/^(\d{4})-(0[1-9]|1[0-2])$/)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  return year * 12 + month - 1
}

function formatAxisYear(year: number): string {
  return `'${String(year).slice(-2)}`
}

function isTruthy(value?: string): boolean {
  return (value ?? '').trim().toLowerCase() === 'true'
}

function normalizeColor(colorValue: string | undefined, type: string): string {
  const color = (colorValue ?? '').trim()
  const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)
  const isRgbHsl = /^(rgb|hsl)a?\([^)]*\)$/.test(color)
  const isNamed = /^[a-zA-Z]+$/.test(color)
  if (isHex || isRgbHsl || isNamed) {
    return color
  }
  return FALLBACK_COLORS[type] ?? '#6b7280'
}

function monthToYear(value: number): number {
  return Math.floor(value / 12)
}

function barWidthPercent(start: number, end: number, minMonth: number, maxMonth: number): number {
  const totalSpan = maxMonth - minMonth + 1
  const width = ((end - start + 1) / totalSpan) * 100
  return Math.max(width, 1.5)
}

function barLeftPercent(start: number, minMonth: number, maxMonth: number): number {
  const totalSpan = maxMonth - minMonth + 1
  return ((start - minMonth) / totalSpan) * 100
}

export default function Timeline() {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTimeline = async () => {
      setIsLoading(true)
      setError('')

      try {
        const csvUrl = `${import.meta.env.BASE_URL}assets/data/timeline.csv`
        const response = await fetch(csvUrl)
        if (!response.ok) {
          throw new Error(`Could not load timeline CSV (${response.status})`)
        }

        const csvText = await response.text()
        const parsed = Papa.parse<TimelineRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().toLowerCase(),
        })

        if (parsed.errors.length > 0) {
          throw new Error(parsed.errors[0].message)
        }

        const currentMonth = new Date().getFullYear() * 12 + new Date().getMonth()

        const cleaned = parsed.data
          .map((row, index) => {
            const title = (row.title ?? '').trim()
            const type = (row.type ?? 'project').trim().toLowerCase()
            const startRaw = (row.start ?? '').trim()
            const endRaw = (row.end ?? '').trim()
            const ongoing = isTruthy(row.ongoing)

            const startMonth = parseYearMonth(startRaw)
            const parsedEndMonth = parseYearMonth(endRaw)
            const endMonth = ongoing ? currentMonth : parsedEndMonth

            if (!title || startMonth === null || endMonth === null) {
              return null
            }

            return {
              id: (row.id ?? `row-${index}`).trim() || `row-${index}`,
              type,
              title,
              subtitle: (row.subtitle ?? '').trim(),
              startMonth,
              endMonth: Math.max(startMonth, endMonth),
              startRaw,
              endRaw: ongoing ? 'present' : endRaw,
              ongoing,
              color: normalizeColor(row.color, type),
              link: (row.link ?? '').trim(),
              logoClass: (row.logo ?? '').trim(),
              sortOrder: Number(row.sort_order ?? Number.NaN),
            }
          })
          .filter((item): item is TimelineItem => item !== null)
          .sort((a, b) => {
            const hasSortA = Number.isFinite(a.sortOrder)
            const hasSortB = Number.isFinite(b.sortOrder)

            if (hasSortA && hasSortB && a.sortOrder !== b.sortOrder) {
              return b.sortOrder - a.sortOrder
            }

            if (a.startMonth !== b.startMonth) {
              return b.startMonth - a.startMonth
            }

            return b.endMonth - a.endMonth
          })

        setItems(cleaned)
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Unexpected error while loading timeline data.'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadTimeline()
  }, [])

  const axis = useMemo(() => {
    if (items.length === 0) {
      return {
        minMonth: 0,
        maxMonth: 0,
        years: [] as number[],
      }
    }

    const rawMinMonth = Math.min(...items.map((item) => item.startMonth))
    const rawMaxMonth = Math.max(...items.map((item) => item.endMonth))

    const minYear = monthToYear(rawMinMonth)
    const maxYear = monthToYear(rawMaxMonth)
    const minMonth = minYear * 12
    const maxMonth = maxYear * 12 + 11

    const years: number[] = []
    for (let year = minYear; year <= maxYear; year += 1) {
      years.push(year)
    }

    return { minMonth, maxMonth, years }
  }, [items])

  const typeLegend = useMemo(() => {
    const seen = new Map<string, string>()
    for (const item of items) {
      if (!seen.has(item.type)) {
        seen.set(item.type, item.color)
      }
    }
    return Array.from(seen.entries())
  }, [items])

  const yearColumns = useMemo(
    () => `repeat(${Math.max(axis.years.length, 1)}, minmax(0, 1fr))`,
    [axis.years.length],
  )

  return (
    <div className="flex justify-center">
      <main className="container mx-auto max-w-[980px] px-6 py-10">
        <Link to="/" className="back-link text-blue-500">
          ← back
        </Link>

        <section className="mt-6">
          <h2 className="text-2xl font-bold">Experience Timeline</h2>
        </section>

        {isLoading ? (
          <section className="timeline-state mt-8">Loading timeline...</section>
        ) : error ? (
          <section className="timeline-state mt-8 text-red-600">{error}</section>
        ) : (
          <section className="mt-8">
            <div className="timeline-content">
              <div className="timeline-gridlines" aria-hidden="true" style={{ gridTemplateColumns: yearColumns }}>
                {axis.years.map((year) => (
                  <div key={year} className="timeline-gridline" />
                ))}
              </div>

              {items.map((item) => {
                const left = barLeftPercent(item.startMonth, axis.minMonth, axis.maxMonth)
                const width = barWidthPercent(item.startMonth, item.endMonth, axis.minMonth, axis.maxMonth)

                return (
                  <div className="timeline-row" key={item.id}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`timeline-bar ${item.ongoing ? 'active-bar' : ''}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        aria-label={`${item.title} (${item.startRaw} to ${item.endRaw})`}
                      >
                        <span className="timeline-bar-text">
                          <span className="timeline-bar-label">{item.title}</span>
                          {item.subtitle || item.logoClass ? (
                            <span className="timeline-bar-subtitle timeline-subtitle-inline">
                              {item.subtitle ? <span>{item.subtitle}</span> : null}
                              {item.logoClass ? <span className={`logo ${item.logoClass}`} aria-hidden="true" /> : null}
                            </span>
                          ) : null}
                        </span>
                      </a>
                    ) : (
                      <div
                        className={`timeline-bar ${item.ongoing ? 'active-bar' : ''}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        aria-label={`${item.title} (${item.startRaw} to ${item.endRaw})`}
                      >
                        <span className="timeline-bar-text">
                          <span className="timeline-bar-label">{item.title}</span>
                          {item.subtitle || item.logoClass ? (
                            <span className="timeline-bar-subtitle timeline-subtitle-inline">
                              {item.subtitle ? <span>{item.subtitle}</span> : null}
                              {item.logoClass ? <span className={`logo ${item.logoClass}`} aria-hidden="true" /> : null}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="timeline-axis" aria-hidden="true" style={{ gridTemplateColumns: yearColumns }}>
                {axis.years.map((year) => (
                  <span className="timeline-axis-label" key={year}>{formatAxisYear(year)}</span>
                ))}
            </div>

            {typeLegend.length > 0 ? (
              <div className="timeline-legend mt-4">
                {typeLegend.map(([type, color]) => (
                  <span className="timeline-legend-item" key={type}>
                    <span className="timeline-legend-swatch" aria-hidden="true" />
                    {type}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        )}
      </main>
    </div>
  )
}
