import { useState, useMemo } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TxType = 'deposit' | 'debit'

export interface Transaction {
  id: number
  type: TxType
  label: string
  sub: string
  /** Human-readable display date, e.g. "16 Apr 2026" */
  date: string
  /** ISO yyyy-mm-dd string used for date comparisons */
  isoDate: string
  amount: number
}

export interface UseTransactionFilterOptions {
  /** Full list of transactions to filter */
  transactions: Transaction[]
  /** Number of items per page (default 8) */
  pageSize?: number
}

export interface UseTransactionFilterReturn {
  // Filter state
  search: string
  setSearch: (v: string) => void
  selectedStatuses: string[]
  setSelectedStatuses: (v: string[]) => void
  dateFrom: string
  setDateFrom: (v: string) => void
  dateTo: string
  setDateTo: (v: string) => void
  clearFilters: () => void

  // Pagination state
  page: number
  setPage: (p: number) => void
  pageSize: number
  totalPages: number

  // Derived data
  filtered: Transaction[]
  paginated: Transaction[]
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTransactionFilter({
  transactions,
  pageSize = 8,
}: UseTransactionFilterOptions): UseTransactionFilterReturn {
  const [search, setSearchRaw] = useState('')
  const [page, setPageRaw] = useState(1)
  const [selectedStatuses, setSelectedStatusesRaw] = useState<string[]>([])
  const [dateFrom, setDateFromRaw] = useState('')
  const [dateTo, setDateToRaw] = useState('')

  // Wrap setters to reset page on filter change
  const setSearch = (v: string) => { setSearchRaw(v); setPageRaw(1) }
  const setSelectedStatuses = (v: string[]) => { setSelectedStatusesRaw(v); setPageRaw(1) }
  const setDateFrom = (v: string) => { setDateFromRaw(v); setPageRaw(1) }
  const setDateTo = (v: string) => { setDateToRaw(v); setPageRaw(1) }

  const clearFilters = () => {
    setSearchRaw('')
    setSelectedStatusesRaw([])
    setDateFromRaw('')
    setDateToRaw('')
    setPageRaw(1)
  }

  const filtered = useMemo(() => {
    let result = transactions

    // Keyword search
    const q = search.toLowerCase().trim()
    if (q) {
      result = result.filter(
        tx =>
          tx.label.toLowerCase().includes(q) ||
          tx.sub.toLowerCase().includes(q),
      )
    }

    // Type filter — only one can be active at a time
    if (selectedStatuses.includes('deposit')) {
      result = result.filter(tx => tx.type === 'deposit')
    } else if (selectedStatuses.includes('debit')) {
      result = result.filter(tx => tx.type === 'debit')
    }

    // Period filters use isoDate for reliable comparison
    const now = new Date()

    if (selectedStatuses.includes('today')) {
      const todayStr = now.toISOString().slice(0, 10)
      result = result.filter(tx => tx.isoDate === todayStr)
    }

    if (selectedStatuses.includes('this_week')) {
      const weekAgo = new Date(now)
      weekAgo.setDate(now.getDate() - 7)
      result = result.filter(tx => new Date(tx.isoDate) >= weekAgo)
    }

    if (selectedStatuses.includes('this_month')) {
      const y = now.getFullYear()
      const m = now.getMonth()
      result = result.filter(tx => {
        const d = new Date(tx.isoDate)
        return d.getFullYear() === y && d.getMonth() === m
      })
    }

    // Date-range filter
    if (dateFrom) {
      result = result.filter(tx => new Date(tx.isoDate) >= new Date(dateFrom))
    }
    if (dateTo) {
      result = result.filter(tx => new Date(tx.isoDate) <= new Date(dateTo))
    }

    return result
  }, [transactions, search, selectedStatuses, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

  // Clamp page if filters reduced total pages
  const safePage = Math.min(page, totalPages)

  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  return {
    search,
    setSearch,
    selectedStatuses,
    setSelectedStatuses,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    clearFilters,
    page: safePage,
    setPage: setPageRaw,
    pageSize,
    totalPages,
    filtered,
    paginated,
  }
}
