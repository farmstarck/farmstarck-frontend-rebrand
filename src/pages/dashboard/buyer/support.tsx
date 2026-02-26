import React from 'react'
import { NavigateButton } from './settings'

const Support = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Help/Support</h1>
            <div className="bg-white p-5 lg:p-10 flex items-start flex-col gap-5 w-full rounded-2xl shadow-sm overflow-hidden">
              <NavigateButton label='Raise a Ticket' href='support/raise-ticket' />
              <NavigateButton label='Manage Ticket' href='support/manage-tickets' />
              <NavigateButton label='FAQs' href='support/faqs' />
              <NavigateButton label='Contact Support' href='/contact' />
            </div>
        </div>
    )
}

export default Support