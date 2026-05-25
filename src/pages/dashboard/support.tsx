import React, { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Minus,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { useRouter } from "next/router";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import CommunityService from "@/services/community.service";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user.queries";
import DashboardLayout from "@/layouts/DashboardLayout";

// ── Types ────────────────────────────────────────────────────────────
interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// ── FAQ Data ─────────────────────────────────────────────────────────
const FAQ_CATEGORIES = [
  { id: "marketplace", label: "Marketplace" },
  { id: "wallet", label: "Wallet" },
  { id: "orders", label: "Orders" },
  { id: "delivery", label: "Delivery" },
];

const FAQS: FAQ[] = [
  {
    id: "1",
    category: "marketplace",
    question: "How do I fund my wallet?",
    answer:
      "You can fund your wallet through multiple payment methods including bank transfer, debit card, or USSD. Simply go to your wallet section, click on Fund Wallet, choose your preferred payment method, and follow the instructions.",
  },
  {
    id: "2",
    category: "marketplace",
    question: "How do I make complaints about an order or a delivery?",
    answer:
      "To make a complaint, go to your order history, select the specific order, and click on Report Issue. You can also contact our support team directly through the contact form below. Our team will respond within 24 hours.",
  },
  {
    id: "3",
    category: "marketplace",
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 2-5 business days depending on your location. Express delivery is available for selected items and takes 24-48 hours. You will receive tracking information once your order is dispatched.",
  },
  {
    id: "4",
    category: "wallet",
    question: "How do I withdraw from my wallet?",
    answer:
      "To withdraw from your wallet, navigate to the wallet section, click on Withdraw, enter the amount you wish to withdraw, and provide your bank account details. The funds will be transferred to your account within 24 hours.",
  },
  {
    id: "5",
    category: "wallet",
    question: "Are there any withdrawal limits?",
    answer:
      "The minimum withdrawal amount is ₦500, and the maximum daily withdrawal limit is ₦500,000. These limits may vary based on your account verification level.",
  },
  {
    id: "6",
    category: "orders",
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order while it is still in pending status. Once a seller has started processing your order, cancellation may no longer be possible. Go to My Orders, select the order, and tap Cancel Order.",
  },
  {
    id: "7",
    category: "orders",
    question: "How do I track my order?",
    answer:
      "You can track your order in real-time by going to My Orders and clicking on the specific order. You will see the current status and estimated delivery time, as well as a full timeline of updates.",
  },
  {
    id: "8",
    category: "delivery",
    question: "Do you deliver to all states in Nigeria?",
    answer:
      "Yes, we deliver to all 36 states in Nigeria. However, delivery times may vary depending on your location. Remote areas may experience longer delivery times.",
  },
  {
    id: "9",
    category: "delivery",
    question: "What is the delivery fee?",
    answer:
      "Delivery fees vary based on your location and the size of your order. The exact fee will be calculated and shown at checkout before you confirm your order. Store pickup is always free.",
  },
];

// ── Contact info ─────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "support@farmstarck.com",
    href: "mailto:support@farmstarck.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 813 039 5444",
    href: "tel:+2348130395444",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "298, Herbert Macaulay Way, Sabo Yaba, Lagos",
    href: null,
  },
];

// ── Main Component ───────────────────────────────────────────────────
const Support = () => {
  const router = useRouter();
  const { data: profile } = useQuery(userQueries.profile());

  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [activeCategory, setActiveCategory] = useState("marketplace");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: profile?.fullName ?? "",
    email: profile?.email ?? "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || profile.fullName,
        email: prev.email || profile.email,
      }));
    }
  }, [profile]);

  const filteredFaqs = FAQS.filter((faq) => faq.category === activeCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      ErrorMessage("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await CommunityService.contactUs({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      SuccessMessage(
        "Message sent successfully! We'll get back to you within 24 hours.",
      );
      setFormData((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      ErrorMessage(renderAxiosOrAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Help & Support
          </h1>
        </button>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        {(["faq", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary/40"
            }`}
          >
            {tab === "faq" ? "FAQs" : "Contact Support"}
          </button>
        ))}
      </div>

      {/* ── FAQ Tab ───────────────────────────────────────────────── */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenFaqId(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() =>
                    setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                  }
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    {openFaqId === faq.id ? (
                      <Minus size={14} className="text-white" />
                    ) : (
                      <Plus size={14} className="text-white" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqId === faq.id
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-10">
                No FAQs available for this category yet.
              </p>
            )}
          </div>

          {/* Nudge to contact tab */}
          <div className="mt-8 p-4 bg-litegreen rounded-xl flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <button
              onClick={() => setActiveTab("contact")}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Contact Support →
            </button>
          </div>
        </div>
      )}

      {/* ── Contact Tab ───────────────────────────────────────────── */}
      {activeTab === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact info sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-5">Get in touch</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-litegreen rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-gray-800">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Response time badge */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <p className="text-sm font-semibold text-primary mb-1">
                ⚡ Fast Response
              </p>
              <p className="text-xs text-gray-600">
                Our support team typically responds within{" "}
                <strong>24 hours</strong> on business days.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
              <h2 className="font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Describe your issue or question in detail..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Support.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Support;
