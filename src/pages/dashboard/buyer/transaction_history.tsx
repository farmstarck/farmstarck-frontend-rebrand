'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, WalletMinimal, ShoppingCart } from 'lucide-react'
import TitleHeader from '@/components/dashboard/buyer/TitleHeader'
import SearchAndFilter from '@/components/common/ui/SearchAndFilter'

type TxType = 'deposit' | 'debit'

interface Transaction {
    id: number
    type: TxType
    label: string
    sub: string
    date: string
    amount: number
}


//mock trnx data
const now = new Date()
const todayStr = now.toISOString().slice(0, 10)
const thisWeekStart = new Date(now); thisWeekStart.setDate(now.getDate() - 6)
const thisMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

const ALL_TRANSACTIONS: Transaction[] = Array.from({ length: 40 }, (_, i) => {
    const isDeposit = i % 3 !== 1

    let isoDate: string
    if (i < 3) {
        isoDate = todayStr                                          
    } else if (i < 8) {
        const d = new Date(thisWeekStart)
        d.setDate(thisWeekStart.getDate() + (i % 5))
        isoDate = d.toISOString().slice(0, 10)                      
    } else if (i < 18) {
        isoDate = `${thisMonthStr}-${String((i % 20) + 1).padStart(2, '0')}` 
    } else {
        isoDate = `2025-0${(i % 2) + 1}-${String((i % 28) + 1).padStart(2, '0')}` 
    }

    return {
        id: i + 1,
        type: isDeposit ? 'deposit' : 'debit',
        label: isDeposit ? 'Deposit' : 'Debit',
        sub: isDeposit ? 'From Paystack Titan MFB' : 'Payment for Order Placement',
        date: new Date(isoDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        isoDate,
        amount: isDeposit ? 150450.0 : 80500.0,
    }
})

const PAGE_SIZE = 8

const fmt = (n: number) =>
    'N' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// Pagination 
function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
    const totalPages = Math.ceil(total / PAGE_SIZE)

    const pages: (number | '...')[] = []
    pages.push(1)
    if (page > 5) pages.push('...')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
    if (page < totalPages - 2) pages.push('...')
    if (totalPages > 1) pages.push(totalPages)

    return (
        <div className="flex items-center justify-center gap-1.5 pt-4">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 disabled:opacity-30 hover:text-white transition-colors"
            >
                <ChevronLeft size={14} />
            </button>

            {pages.map((p, i) =>
                p === '...' ? (
                    <span key={`d${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-500">…</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onChange(p as number)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${p === page ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-400'
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-6  00 disabled:opacity-30 hover:text-gray-400 transition-colors"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    )
}

// Main page
const TransactionHistory = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const filtered = useMemo(() => {
        let result = ALL_TRANSACTIONS

        // search
        const q = search.toLowerCase().trim()
        if (q) result = result.filter(tx => tx.label.toLowerCase().includes(q) || tx.sub.toLowerCase().includes(q))

        // type filter
        if (selectedStatuses.includes('deposit')) result = result.filter(tx => tx.type === 'deposit')
        if (selectedStatuses.includes('debit')) result = result.filter(tx => tx.type === 'debit')

        // period filter
        const now = new Date()
        if (selectedStatuses.includes('today'))
            result = result.filter(tx => new Date(tx.date).toDateString() === now.toDateString())
        if (selectedStatuses.includes('this_week')) {
            const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7)
            result = result.filter(tx => new Date(tx.date) >= weekAgo)
        }
        if (selectedStatuses.includes('this_month'))
            result = result.filter(tx => new Date(tx.date).getMonth() === now.getMonth())

        // date range
        if (dateFrom) result = result.filter(tx => new Date(tx.date) >= new Date(dateFrom))
        if (dateTo) result = result.filter(tx => new Date(tx.date) <= new Date(dateTo))

        return result
    }, [search, selectedStatuses, dateFrom, dateTo])

    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <div className="lg:max-w-7xl mx-auto px-4">
            <TitleHeader title="Transaction History" />

            <div className=" py-4 flex flex-col gap-4 text-dark">

                {/* Search + Filter */}
                <SearchAndFilter 
                    search={search}
                    onSearchChange={val => { setSearch(val); setPage(1) }}
                    searchPlaceholder="Search by issue title"
                    statusText=""
                    statusOptions={[
                        { value: 'today', label: 'Today' },
                        { value: 'this_week', label: 'This Week' },
                        { value: 'this_month', label: 'This Month' },
                        { value: 'deposit', label: 'Deposit' },
                        { value: 'debit', label: 'Debit' },
                    ]}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={(v) => { setSelectedStatuses(v); setPage(1) }}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    onClearFilters={() => { setSelectedStatuses([]); setDateFrom(''); setDateTo(''); setPage(1) }}
                />

                {/* Transaction List */}
                <div className="bg-white rounded-2xl py-5">
                    <ul className="flex flex-col divide-y divide-gray-300">
                        {paginated.map(tx => (
                            <li key={tx.id} className="flex px-4 items-center justify-between py-3.5 first:pt-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    {/* Icon */}
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'deposit' ? 'bg-lite' : 'bg-[#ffcccc]'
                                        }`}>
                                        {tx.type === 'deposit' ? (
                                            <WalletMinimal size={20} className="text-[#28d028]" />
                                        ) : (
                                            <ShoppingCart size={20} className="text-red" />
                                        )}
                                    </div>
                                    {/* Text */}
                                    <div>
                                        <p className={`text-sm md:text-base font-semibold ${tx.type === 'deposit' ? 'text-[#28d028]' : 'text-red'}`}>
                                            {tx.label}
                                        </p>
                                        <p className="text-[14px] text-gray-400 leading-tight">{tx.sub}</p>
                                        <p className="text-[13px] text-gray-600 mt-0.5">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`text-sm md:text-base font-bold shrink-0 ml-3 ${tx.type === 'deposit' ? 'text-[#28d028]' : 'text-red'}`}>
                                    {fmt(tx.amount)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <Pagination page={page} total={filtered.length} onChange={setPage} />
                </div>

            </div>

        </div>
    )
}

export default TransactionHistory;