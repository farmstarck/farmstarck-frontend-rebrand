import RouteBack from '@/components/common/auth/RouteBack';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState('marketplace');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Mock FAQ data
  const categories = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'orders', label: 'Orders' },
    { id: 'delivery', label: 'Delivery' },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'marketplace',
      question: 'Is there a minimum amount to save?',
      answer: 'No, there is no minimum amount to save. You can start saving with as little as ₦100. Our platform allows you to set goals and save at your own pace, making it flexible for everyone regardless of the amount to get food in return.',
    },
    {
      id: '2',
      category: 'marketplace',
      question: 'How do I fund my wallet?',
      answer: 'You can fund your wallet through multiple payment methods including bank transfer, debit card, or USSD. Simply go to your wallet section, click on "Fund Wallet", choose your preferred payment method, and follow the instructions.',
    },
    {
      id: '3',
      category: 'marketplace',
      question: 'Can I break my saving?',
      answer: 'Yes, you can break your savings at any time. However, please note that breaking your savings before the maturity date may attract a penalty fee depending on your savings plan. Regular savings can be withdrawn without penalties.',
    },
    {
      id: '4',
      category: 'marketplace',
      question: 'Can I save to get back cash?',
      answer: 'Yes, absolutely! You can choose to receive cash back when you break your savings. Alternatively, you can also convert your savings into food items from our marketplace at discounted rates.',
    },
    {
      id: '5',
      category: 'marketplace',
      question: 'What happens if I break my savings before due date?',
      answer: 'If you break your savings before the due date, a penalty fee of 10% may be applied to your total savings amount. However, this depends on your savings plan. Flexible savings plans have no penalties, while fixed savings plans have penalty charges.',
    },
    {
      id: '6',
      category: 'marketplace',
      question: 'How do I make complaints about an order or a delivery?',
      answer: 'To make a complaint, go to your order history, select the specific order, and click on "Report Issue". You can also contact our support team directly through the support section. Our team will respond within 24 hours to resolve your complaint.',
    },
    {
      id: '7',
      category: 'marketplace',
      question: 'How long does it take to deliver items shopped on Vondmart Marketplace?',
      answer: 'Standard delivery takes 2-5 business days depending on your location. Express delivery is available for selected items and takes 24-48 hours. You will receive tracking information once your order is dispatched.',
    },
    {
      id: '8',
      category: 'wallet',
      question: 'How do I withdraw from my wallet?',
      answer: 'To withdraw from your wallet, navigate to the wallet section, click on "Withdraw", enter the amount you wish to withdraw, and provide your bank account details. The funds will be transferred to your account within 24 hours.',
    },
    {
      id: '9',
      category: 'wallet',
      question: 'Are there any withdrawal limits?',
      answer: 'The minimum withdrawal amount is ₦500, and the maximum daily withdrawal limit is ₦500,000. These limits may vary based on your account verification level.',
    },
    {
      id: '10',
      category: 'orders',
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order within 2 hours of placing it without any charges. After 2 hours, cancellation may attract a fee depending on the order status. Once the order is shipped, cancellation is no longer possible.',
    },
    {
      id: '11',
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time by going to "My Orders" section and clicking on the specific order. You will see the current status and estimated delivery time. You will also receive SMS and email notifications at each stage.',
    },
    {
      id: '12',
      category: 'delivery',
      question: 'Do you deliver to all states in Nigeria?',
      answer: 'Yes, we deliver to all 36 states in Nigeria. However, delivery times may vary depending on your location. Remote areas may experience longer delivery times.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <RouteBack label="Frequently Asked Questions">
      <div className="w-full flex flex-col gap-4">
        {/* Category Tabs */}
        <div className="border border-litegreen rounded-xl p-1">
          <div className="bg-white rounded-lg p-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-dark-green shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-primary overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
              >
                <span className="text-left font-medium text-gray-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  {openFaqId === faq.id ? (
                    <Minus size={16} className="text-white" />
                  ) : (
                    <Plus size={16} className="text-white" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 pt-2 text-gray-700 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              No FAQs available for this category yet.
            </p>
          </div>
        )}
      </div>
    </RouteBack>
  );
};

export default Faqs;
