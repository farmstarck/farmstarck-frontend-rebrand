import React, { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import RouteBack from '@/components/common/auth/RouteBack';
import Image from 'next/image';
import AddComment from '@/components/dashboard/buyer/AddComment';
import { ErrorMessage } from '@/utils/PageUtils';
import SuccessModal from '@/components/common/status/SuccessModal';
import SelectableList from '@/components/dashboard/buyer/SelectableList';
import ProceedOrCancelModal from '@/components/dashboard/ProceedOrCancelModal';

interface TicketData {
  id: string;
  issueTitle: string;
  category: string;
  priority: string;
  status: string;
  lastUpdated: string;
  assignedAgent: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  issueDescription: string;
  images: string[];
  conversation: Array<{
    id: string;
    sender: 'user' | 'agent';
    message: string;
    time: string;
  }>;
}

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];


const SingleTicket = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [message, setMessage] = useState('');
  const [addComment, setAddComment] = useState(false);
  const [verified, setVerified] = useState(false);
  const [data, setData] = useState<TicketData | null>(null);
  const [changePriority, setChangePriority] = useState(false);
  const [closeTicket, setCloseTicket] = useState(false);



  // Mock ticket data
  const ticketData: TicketData = {
    id: 'TICKET ID: FRM-TCK-0163',
    issueTitle: 'Bad Product Delivered',
    category: 'Delivery',
    priority: 'High',
    status: 'Opened',
    lastUpdated: '2 Day Ago',
    assignedAgent: 'Tokunbo Ajayi',
    userName: 'Nneka Ifeji Joshua Ibukunolu',
    userEmail: 'mojisola0t1999@gmail.com',
    userPhone: 'None Provided',
    issueDescription: 'The product I got is which I ordered vs what I got. And it is painful I had to wait for 2 days to still receive a BAD Product.',
    images: [
      '/assets/images/dashboard/buyer/eggs.png',
      '/assets/images/dashboard/buyer/banana.png',
    ],
    conversation: [
      {
        id: '1',
        sender: 'user',
        message: "Good day sir, I'm very sorry for the inconvenience but can you tell me possible 24 I make refund pls🙏🏿",
        time: '10:23 AM',
      },
      {
        id: '2',
        sender: 'agent',
        message: "Hi, I'm not displeased that we are working on resolving this.",
        time: '10:25 AM',
      },
    ],
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleComment = (comment: string) => {
    // Handle adding comment logic
    if (comment.trim() === '') return ErrorMessage('Comment cannot be empty.');
    setAddComment(false);
    setVerified(true)
    console.log('Adding comment:', comment);
  }

  return (
    <RouteBack label="Ticket Details" menu={true}
      menuOptions={[
        {
          label: "Add Comment / Reply",
          onClick: () => setAddComment(true)
        },
        {
          label: "Change Priority",
          onClick: () => setChangePriority(true)
        },
        {
          label: "Close Ticket",
          onClick: () => setCloseTicket(true)
        },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {/* Ticket Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{ticketData.id}</span>
            <ChevronDown
              size={20}
              className={`text-gray-600 transition-transform ${showDetails ? 'rotate-180' : ''
                }`}
            />
          </button>

          {showDetails && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Issue Title:</p>
                  <p className="font-medium text-gray-900">{ticketData.issueTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Category:</p>
                  <p className="font-medium text-gray-900">{ticketData.category}</p>
                </div>
                <div>
                  <p className="text-gray-600">Priority:</p>
                  <p className="font-medium text-gray-900">{ticketData.priority}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Status:</p>
                  <p className="font-medium text-primary">{ticketData.status}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated:</p>
                  <p className="font-medium text-gray-900">{ticketData.lastUpdated}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Date Created:</p>
                  <p className="font-medium text-gray-900">05-12-2025</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">Assigned Agent:</p>
                  <p className="font-medium text-gray-900">{ticketData.assignedAgent}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">USER INFORMATION</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-medium text-gray-900">{ticketData.userName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium text-gray-900">{ticketData.userEmail}</p>
            </div>
            <div>
              <p className="text-gray-600">User Type:</p>
              <p className="font-medium text-gray-900">Buyer</p>
            </div>
          </div>
        </div>

        {/* Issue Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">ISSUE DESCRIPTION</h3>
          <p className="text-sm text-gray-700 mb-4">{ticketData.issueDescription}</p>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ticketData.images.map((img, index) => (
              <div key={index} className="relative h-64 rounded-lg w-full overflow-hidden bg-gray-100">
                <Image
                  src={img}
                  alt={`Issue image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">CONVERSATION THREAD</h3>

          {/* Messages */}
          <div className="space-y-4 mb-4">
            {ticketData.conversation.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'agent'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                    }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-primary-100' : 'text-gray-500'
                      }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        <AddComment isOpen={addComment}
          onClose={() => setAddComment(false)}
        />

        <SelectableList
          label='Change Priority'
          selected={data?.priority}
          isOpen={changePriority}
          onChange={(value) =>{
            setData((prev) => ({ ...prev!, priority: value }));
          } }
          onClose={() => setChangePriority(false)}
          options={priorityOptions}

        />

        <ProceedOrCancelModal
          isOpen={closeTicket}
          title='Are you sure you want to close this Ticket?'
          onClose={() => setCloseTicket(false)}
        />


      </div>
    </RouteBack>
  );
};

export default SingleTicket;