'use client'

import { WalletMinimal, ShoppingCart } from 'lucide-react'
import Pagination from '@/components/common/ui/Pagination'
import TitleHeader from '@/components/dashboard/buyer/TitleHeader'
import SearchAndFilter from '@/components/common/ui/SearchAndFilter'
import { useTransactionFilter, Transaction } from '@/hooks/useTransactionFilter'

// ─── Mock data ────────────────────────────────────────────────────────────────

const now = new Date()
const todayStr = now.toISOString().slice(0, 10)
const thisWeekStart = new Date(now)
thisWeekStart.setDate(now.getDate() - 6)
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
    date: new Date(isoDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    isoDate,
    amount: isDeposit ? 150450.0 : 80500.0,
  }
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  'N' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// ─── Page ─────────────────────────────────────────────────────────────────────

const TransactionHistory = () => {
  const {
    search, setSearch,
    selectedStatuses, setSelectedStatuses,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    clearFilters,
    page, setPage,
    pageSize,
    totalPages,
    filtered,
    paginated,
  } = useTransactionFilter({ transactions: ALL_TRANSACTIONS })

  return (
    <div className="lg:max-w-7xl mx-auto px-4">
      <TitleHeader title="Transaction History" />

      <div className="py-4 flex flex-col gap-4 text-dark">

        {/* Search + Filter */}
        <SearchAndFilter
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search transactions"
          statusText=""
          statusOptions={[
            { value: 'today',      label: 'Today' },
            { value: 'this_week',  label: 'This Week' },
            { value: 'this_month', label: 'This Month' },
            { value: 'deposit',    label: 'Deposit' },
            { value: 'debit',      label: 'Debit' },
          ]}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          onClearFilters={clearFilters}
        />

        {/* Transaction List */}
        <div className="bg-white rounded-2xl py-5">
          <ul className="flex flex-col divide-y divide-gray-300">
            {paginated.map(tx => (
              <li
                key={tx.id}
                className="flex px-4 items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      tx.type === 'deposit' ? 'bg-lite' : 'bg-[#ffcccc]'
                    }`}
                  >
                    {tx.type === 'deposit' ? (
                      <WalletMinimal size={20} className="text-[#28d028]" />
                    ) : (
                      <ShoppingCart size={20} className="text-red" />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <p
                      className={`text-sm md:text-base font-semibold ${
                        tx.type === 'deposit' ? 'text-[#28d028]' : 'text-red'
                      }`}
                    >
                      {tx.label}
                    </p>
                    <p className="text-[14px] text-gray-400 leading-tight">{tx.sub}</p>
                    <p className="text-[13px] text-gray-600 mt-0.5">{tx.date}</p>
                  </div>
                </div>

                <p
                  className={`text-sm md:text-base font-bold shrink-0 ml-3 ${
                    tx.type === 'deposit' ? 'text-[#28d028]' : 'text-red'
                  }`}
                >
                  {fmt(tx.amount)}
                </p>
              </li>
            ))}
          </ul>

          {paginated.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-10">No transactions found.</p>
          )}

          <div className="px-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              itemsPerPage={pageSize}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default TransactionHistory