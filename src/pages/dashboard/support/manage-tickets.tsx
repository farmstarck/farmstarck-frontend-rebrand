import React, { useState } from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import RouteBack from '@/components/common/auth/RouteBack';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReusableFilter from '@/components/dashboard/buyer/ReusableFilter';

interface Ticket {
    id: string;
    title: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'opened' | 'in_progress' | 'closed' | 'resolved';
    dateCreated: string;
}

const ManageTicket = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Mock ticket data
    const [tickets] = useState<Ticket[]>([
        {
            id: 'FRM-TCK-0163',
            title: 'Order not delivered',
            category: 'Delivery',
            priority: 'high',
            status: 'opened',
            dateCreated: '03-12-2025'
        },
        {
            id: 'FRM-TCK-0164',
            title: 'Payment issue',
            category: 'Payment',
            priority: 'urgent',
            status: 'in_progress',
            dateCreated: '03-12-2025'
        },
        {
            id: 'FRM-TCK-0165',
            title: 'Product quality concern',
            category: 'Product',
            priority: 'medium',
            status: 'closed',
            dateCreated: '02-12-2025'
        },
        {
            id: 'FRM-TCK-0166',
            title: 'Account access problem',
            category: 'Account',
            priority: 'high',
            status: 'resolved',
            dateCreated: '01-12-2025'
        }
    ]);

    const statusOptions = [
        { value: 'opened', label: 'Opened' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'closed', label: 'Closed' },
        { value: 'resolved', label: 'Resolved' }
    ];

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
    ];

    const getStatusColor = (status: string) => {
        const colors = {
            opened: 'bg-primary text-white',
            in_progress: 'bg-yellow-500 text-white',
            closed: 'bg-red-500 text-white',
            resolved: 'bg-primary text-white'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-500 text-white';
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            opened: 'Opened',
            in_progress: 'Pending',
            closed: 'Closed',
            resolved: 'Resolved'
        };
        return labels[status as keyof typeof labels] || status;
    };

    const handleClearFilters = () => {
        setSelectedStatuses([]);
        setSelectedPriorities([]);
        setDateFrom('');
        setDateTo('');
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status);
        const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(ticket.priority);

        // Date filtering
        const ticketDate = new Date(ticket.dateCreated.split('-').reverse().join('-'));
        const matchesDateFrom = !dateFrom || ticketDate >= new Date(dateFrom);
        const matchesDateTo = !dateTo || ticketDate <= new Date(dateTo);

        return matchesSearch && matchesStatus && matchesPriority && matchesDateFrom && matchesDateTo;
    });

    const hasActiveFilters = selectedStatuses.length > 0 || selectedPriorities.length > 0 || dateFrom || dateTo;
    const activeFilterCount = selectedStatuses.length + selectedPriorities.length + (dateFrom ? 1 : 0) + (dateTo ? 1 : 0);

    return (
        <RouteBack label='Manage Tickets'>
            <div className="w-full">
                {tickets.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="w-16 h-16 text-white" strokeWidth={2} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            You have not raised any support tickets yet.
                        </h3>
                        <button
                            onClick={() => router.push('/support/raise-ticket')}
                            className="mt-6 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
                        >
                            Raise a Ticket
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Search and Filter Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by issue title"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Filter Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-6 py-3 border rounded-lg font-medium transition-all ${hasActiveFilters || showFilters
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filter</span>
                                {hasActiveFilters && (
                                    <span className="ml-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Reusable Filter Component */}
                        <ReusableFilter
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            statusOptions={statusOptions}
                            selectedStatuses={selectedStatuses}
                            setSelectedStatuses={setSelectedStatuses}
                            showPriorityFilter={true}
                            priorityOptions={priorityOptions}
                            selectedPriorities={selectedPriorities}
                            setSelectedPriorities={setSelectedPriorities}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            setDateFrom={setDateFrom}
                            setDateTo={setDateTo}
                            onClear={handleClearFilters}
                        />

                        {/* Tickets List */}
                        <div className="space-y-4">
                            {filteredTickets.length === 0 ? (
                                <div className="text-center flex items-center justify-center gap-5 flex-col py-12 text-gray-500">
                                    <div>
                                        <Image
                                            width={120}
                                            height={120}
                                            src="/assets/images/dashboard/buyer/warning.png"
                                            alt="not found"
                                        />
                                    </div>
                                    No tickets found matching your filters
                                </div>
                            ) : (
                                filteredTickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => router.push(`ticket/${ticket.id}`)}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            {/* Ticket Info */}
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    Ticket ID: {ticket.id}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Issue Title: {ticket.title}
                                                </p>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Category: {ticket.category}
                                                </p>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Priority: <span className="capitalize">{ticket.priority}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Date Created: {ticket.dateCreated}
                                                </p>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="flex justify-end">
                                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                                                    {getStatusLabel(ticket.status)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </RouteBack>
    );
};

export default ManageTicket;
