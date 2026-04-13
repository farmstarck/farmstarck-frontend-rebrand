'use client'

import { useState } from 'react'
import { EyeOff, ChevronRight, WalletMinimal, ShoppingCart } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import TitleHeader from '@/components/dashboard/buyer/TitleHeader'
import { useNavigate } from '@/hooks/useNavigate'
import FundWallet from '@/components/dashboard/buyer/FundWallet'

const recentTransactions = [
    { id: 1, type: 'deposit', label: 'Deposit', sub: 'From Paystack Titan MFB', date: 'Jan 21st 2025  ·  15:35pm', amount: 150450.0 },
    { id: 2, type: 'debit', label: 'Debit', sub: 'Payment for Order Placement', date: 'Jan 21st 2025  ·  15:35pm', amount: 80500.0 },
    { id: 3, type: 'deposit', label: 'Deposit', sub: 'From Paystack Titan MFB', date: 'Jan 21st 2025  ·  15:35pm', amount: 150450.0 },
]

const chartData = [
    { name: 'Deposit', value: 70, color: '#00c700' },
    { name: 'Purchase Debit', value: 30, color: '#ffbb28' },
]

const fmt = (n: number) =>
    'N' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const MyWallet = () => {
    const { navigate } = useNavigate()
    const [viewBal, setViewBal] = useState(true)
    const [fundWallet, setFundWallet] = useState(false)

    return (
        <div className="max-w-7xl mx-auto px-4">
            <TitleHeader title="My Wallet" />

            <div className="px-4 py-4 bg-[#fbfbfb] flex flex-col gap-4 rounded-2xl">

                {/* Balance Card */}
                <div className="bg-white text-dark rounded-2xl p-5">
                    <p className="text-base md:text-lg  mb-1">Available Funds</p>
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {viewBal ? 'N176,432.68' : 'N••••••••'}
                        </h1>
                        <button onClick={() => setViewBal(p => !p)}>
                            <EyeOff size={17} className="text-gray-500" />
                        </button>
                    </div>
                    <button
                        onClick={() => setFundWallet(true)}
                        className="w-full py-3 bg-(--primary) active:scale-[0.98] transition-all text-white text-sm md:text-base font-semibold rounded-xl"
                    >
                        Fund Wallet
                    </button>
                </div>

                {/* Transaction History Preview */}
                <div className="bg-white text-dark rounded-2xl py-6 border-gray-200  border">
                    <div className="flex px-5 items-center justify-between mb-4">
                        <p className="text-base md:text-xl font-bold">Transaction History</p>
                        <button
                            onClick={() => navigate('/dashboard/buyer/transaction_history')}
                            className="text-[14px] md:text-base flex items-center gap-0.5 hover:text-dark/50 transition-colors"
                        >
                            See all <ChevronRight size={12} />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-4 ">
                        {recentTransactions.map((tx, index) => (
                            <div className={`${index !== recentTransactions.length - 1 ? "border-b border-b-gray-200 pb-3" : ""} `}>
                                <li key={tx.id} className="flex px-5 pb-1 items-center justify-between">
                                    <div className="flex items-center gap-3">

                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'deposit' ? 'bg-green-500/10' : 'bg-orange-500/10'
                                            }`}>
                                            {tx.type === 'deposit' ? (
                                                <WalletMinimal size={20} className="text-green-400" />
                                            ) : (
                                               <ShoppingCart size={20} className="text-orange-400" /> 
                                            )}
                                        </div>
                                        <div className=''>
                                            <p className={`text-sm md:text-base font-semibold ${tx.type === 'deposit' ? 'text-[#28d028]' : 'text-(--red)'}`}>
                                                {tx.label}
                                            </p>
                                            <p className="text-sm text-gray-400">{tx.sub}</p>
                                            <p className="text-sm text-gray-600 mt-0.5">{tx.date}</p>
                                        </div>
                                    </div>
                                    <p className={`text-sm md:text-base font-bold ${tx.type === 'deposit' ? 'text-[#28d028]' : 'text-(--red)'}`}>
                                        {fmt(tx.amount)}
                                    </p>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>

                {/* Account Summary */}
                <div className="bg-[#eaffe8] rounded-2xl p-4 text-dark">
                    <p className="text-base lg:text-xl font-bold mb-4">Account Summary</p>
                    <div className="flex items-center justify-center flex-col py-4">
                        {/* Donut Chart */}
                        <div className="w-28 h-28 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={28}
                                        outerRadius={50}
                                        paddingAngle={3}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {chartData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend */}
                        <ul className="flex flex-col gap-3 mt-4">
                            {chartData.map(item => (
                                <li key={item.name} className="flex items-center justify-between gap-10">
                                    <span className="flex items-center gap-2  text-sm font-semibold ">
                                        <span className="w-3.5 h-3.5 rounded-[3px] shrink-0" style={{ backgroundColor: item.color }} />
                                        {item.name}
                                    </span>
                                    <span className="text-sm font-bold ">{item.value}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            {fundWallet && (
                // <ModalLayout onClose={() => setFundWallet(false)}>
                    <FundWallet onClose={() => setFundWallet(false)} />
                // </ModalLayout>
            )}
        </div>
    )
}

export default MyWallet;