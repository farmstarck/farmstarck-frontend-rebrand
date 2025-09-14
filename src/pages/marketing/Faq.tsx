import FaqComp from "../../components/marketing/Faq/FaqComp";

const faqItems = [
  {
    topic: "Marketplace",
    accordionItems: [
      {
        header: "What can I buy on the Farmstarck Marketplace?",
        text: "You can buy fresh produce, grains, tubers, fertilizers, farm equipment, processed food, animal feed, and farm tools.",
      },
      {
        header: "Who can use the marketplace?",
        text: "Farmers, agro-merchants, caterers, households, retailers, and institutions like restaurants and schools.",
      },
      {
        header: "Do I need to register to make purchases?",
        text: "Yes. You need to create an account as a buyer or seller to access the full features.",
      },
      {
        header: "Is there a minimum order quantity?",
        text: "No. We serve both bulk and small-quantity buyers. Whether you want 5 yams or 5,000, we’ve got you.",
      },
      {
        header: "Are your vendors verified?",
        text: "Yes. All vendors undergo verification to ensure product quality and reliability.",
      },
      {
        header: "Can I list my farm products as a seller?",
        text: "Absolutely. We have an onboarding process for farmers, cooperatives, and agri-processors.",
      },
      {
        header: "How do I track my orders?",
        text: "Once an order is placed, you can track its status from your dashboard until it’s delivered.",
      },
      {
        header: "Does Farmstarck deliver across all states?",
        text: "We currently deliver in select states, expanding rapidly. You’ll be notified if your location is eligible during checkout.",
      },
      {
        header: "Can I schedule deliveries in advance?",
        text: "Yes, especially for events or large-scale orders. Scheduling helps us plan procurement and logistics.",
      },
      {
        header: "How is pricing determined?",
        text: "Prices are updated regularly based on market demand, harvest cycles, and logistics factors.",
      },
      {
        header: "What payment methods are accepted?",
        text: "Bank transfers, debit cards, and platform wallet credits. More options coming soon.",
      },
      {
        header: "Can I cancel or edit my order?",
        text: "Yes, but only within a short window before dispatch. Cancellation policy applies.",
      },
      {
        header: "Are there discounts for bulk orders?",
        text: "Yes. Discount tiers are available depending on quantity and item category.",
      },
      {
        header: "Can I rate vendors and products?",
        text: "Yes. Feedback helps us maintain quality across the platform.",
      },
    ],
  },
  {
    topic: "Procurement Services",
    accordionItems: [
      {
        header: "What is Farmstarck Procurement?",
        text: "It’s our service that helps source, transport, and deliver farm produce in bulk across Nigeria.",
      },
      {
        header: "Who is this service for?",
        text: "Retailers, food businesses, caterers, resellers, processors, exporters, and institutions.",
      },
      {
        header: "What crops do you procure?",
        text: "We handle tubers, grains, fruits, vegetables, and on-demand items like animal feed and agro-inputs.",
      },
      {
        header: "What’s the minimum order size?",
        text: "We typically start from 1 bag to full truckloads, depending on the crop and region.",
      },
      {
        header: "Can I get delivery to my doorstep?",
        text: "Yes. We handle end-to-end delivery to your specified address.",
      },
      {
        header: "How does Farmstarck ensure quality?",
        text: "We work with verified farmers and have on-ground agents for quality checks.",
      },
      {
        header: "Can I request recurring procurement?",
        text: "Yes. We offer scheduled sourcing options weekly, biweekly, or monthly.",
      },
      {
        header: "Do I pay before or after delivery?",
        text: "We support both prepaid and pay-on-delivery, depending on your account type and order volume.",
      },
      {
        header: "Can I track the logistics process?",
        text: "Yes. Orders are monitored and updates are shared throughout the supply chain.",
      },
      {
        header: "Where do you source from?",
        text: "Benue, Kano, Niger, Enugu, Oyo, and other major production belts.",
      },
      {
        header: "Can I request sourcing for specific items?",
        text: "Yes. We offer custom procurement based on your business needs.",
      },
      {
        header: "Do you support export procurement?",
        text: "Yes. We are expanding our inter-border trade services for exporters.",
      },
      {
        header: "What is the typical markup or fee?",
        text: "We charge 25–35% depending on sourcing cost, transport, and logistics complexity.",
      },
      {
        header: "How fast can I get my order?",
        text: "Delivery time varies but averages between 24 hours to 5 days depending on the item and location.",
      },
      {
        header: "Can I split orders to multiple locations?",
        text: "Yes. Our logistics partners allow batch distribution on demand.",
      },
    ],
  },
  {
    topic: "Food vault",
    accordionItems: [
      {
        header: "What is Food Vault?",
        text: "Food Vault is a savings wallet that helps you save gradually towards food purchases on Farmstarck.",
      },
      {
        header: "Can I withdraw cash from Food Vault?",
        text: "No. Savings can only be used to buy food and farm items from our platform.",
      },
      {
        header: "How do I fund my Food Vault?",
        text: "You can set automated debits or fund manually through your dashboard.",
      },
      {
        header: "Can I choose how often I save?",
        text: "Yes. You can save daily, weekly, monthly, or manually — whatever works best for you.",
      },
      {
        header: "What if I want to pause my savings?",
        text: "You can pause or change your saving plan anytime via your settings.",
      },
      {
        header: "Can I save towards specific events?",
        text: "Yes. Create goal-based savings for weddings, birthdays, monthly restocking, or school feeding.",
      },
      {
        header: "Will I get any bonuses for saving?",
        text: "Yes. We offer seasonal discounts and reward loyal savers with promo codes and early access to deals.",
      },
      {
        header: "Is my money safe in the Food Vault?",
        text: "Yes. Funds are held securely and are only accessible to purchase food.",
      },
      {
        header: "Can I track my savings?",
        text: "Yes. Your dashboard shows your balance, goals, progress, and transaction history.",
      },
      {
        header: "What if I change my mind after saving?",
        text: "Funds are locked for food purchases only. Withdrawal to bank is not permitted.",
      },
      {
        header: "Can I share my Food Vault with others?",
        text: "Not directly, but you can order food for someone else using your vault balance.",
      },
      {
        header: "What’s the minimum to start saving?",
        text: "You can start with as little as ₦500.",
      },
      {
        header: "Is Food Vault available nationwide?",
        text: "Yes, with food delivery service currently limited to supported states.",
      },
      {
        header: "Can businesses use Food Vault too?",
        text: "Yes. It’s perfect for caterers, restaurants, and organizations that want structured procurement.",
      },
    ],
  },
  {
    topic: "Merchant",
    accordionItems: [
      {
        header: "Who is a merchant on Farmstarck?",
        text: "A merchant is a business or individual that buys and/or sells on Farmstarck, primarily dealing in agri-commodities, chemicals, farm equipment, animal feeds, and bulk produce.",
      },
      {
        header: "What can I sell as a merchant?",
        text: "You can list grains, fertilizers, herbicides, farm tools, feeds, equipment, and even processed food, depending on your inventory and licensing (where applicable).",
      },
      {
        header: "How do I register as a merchant?",
        text: "Sign up via our merchant onboarding form or through a Farmstarck representative. Once verified, you can list products and access wholesale pricing.",
      },
      {
        header: "Can I buy in bulk at wholesale prices?",
        text: "Yes. As a merchant, you get access to real-time wholesale pricing, discount tiers, and priority fulfillment.",
      },
      {
        header: "Do I need to own a warehouse to sell?",
        text: "No. You can list products from your existing inventory or use our logistics and aggregation partners.",
      },
      {
        header: "How does delivery work for merchants?",
        text: "You can choose self-fulfillment, pickup by Farmstarck agents, or use our logistics integration for seamless delivery.",
      },
      {
        header: "How do I get paid for my sales?",
        text: "Payouts are processed directly to your wallet or bank account after delivery confirmation and quality verification.",
      },
      {
        header: "Can I track my sales and inventory?",
        text: "Yes. Merchants have a dashboard that shows product listings, order volume, inventory alerts, and earnings.",
      },
      {
        header: "Do you offer support or account management?",
        text: "Yes. Active merchants are assigned a success rep, and our support team is available via WhatsApp or live chat.",
      },
      {
        header:
          "What’s the benefit of selling through Farmstarck vs. traditional markets?",
        text: "You gain digital visibility, faster access to buyers, verified payments, and broader market reach without middlemen.",
      },
      {
        header: "Can I sell both products and services?",
        text: "Yes. If you offer services such as tractor rentals, spraying, or processing, they can be listed on our upcoming services section.",
      },
      {
        header: "Do I need to pay a subscription to use the platform?",
        text: "No. Listing is free. Farmstarck earns through small transaction and service fees only when you make sales.",
      },
      {
        header: "Can I access inventory management tools as a merchant?",
        text: "Yes. Our AI-powered inventory system is available via subscription to help you track and forecast demand.",
      },
      {
        header: "Is there a limit to the number of products I can list?",
        text: "There’s no hard limit. However, product quality and accurate details are required for listing approval.",
      },
      {
        header: "Do you support merchants outside Nigeria?",
        text: "Currently, our operations focus on Nigeria, but we’re expanding across West Africa soon. Join our waitlist for cross-border merchant access.",
      },
    ],
  },
  {
    topic: "Farmers",
    accordionItems: [
      {
        header: "How do I sell my produce on Farmstarck?",
        text: "Register as a farmer, list your crops or join our cooperative vendor network.",
      },
      {
        header: "Do I need a smartphone to sell?",
        text: "While it helps, we also support low-tech onboarding via field agents and USSD (coming soon).",
      },
      {
        header: "Can I get support with transport and logistics?",
        text: "Yes. We work with logistics partners to help farmers reach bigger markets.",
      },
      {
        header: "What types of crops can I sell?",
        text: "Yams, maize, rice, vegetables, cassava, tomatoes, and more.",
      },
      {
        header: "Will I get paid immediately?",
        text: "Yes. Once your produce is verified and delivered, payment is processed same or next day.",
      },
      {
        header: "How can I track my sales?",
        text: "A simple dashboard shows your orders, earnings, and product status.",
      },
      {
        header: "Do I need to pay to join?",
        text: "No upfront fee. We only deduct a small transaction fee after a successful sale.",
      },
      {
        header: "Do you offer training or support?",
        text: "Yes. Through our Farmer Empowerment Program, you can access training, funding, and tools.",
      },
      {
        header: "What if I don’t have storage?",
        text: "Our procurement service handles pickup and immediate delivery to buyers.",
      },
      {
        header: "How do I join a cooperative on Farmstarck?",
        text: "We onboard cooperatives directly or match you with one based on your location.",
      },
    ],
  },
  {
    topic: "Business",
    accordionItems: [
      {
        header: "What services does Farmstarck offer to businesses?",
        text: "We provide procurement, bulk supply, inventory tools, and a marketplace for all agri-related needs.",
      },
      {
        header: "Can I request regular deliveries for my business?",
        text: "Yes. We offer recurring order setups tailored to your schedule.",
      },
      {
        header: "Do you provide invoices and receipts for each transaction?",
        text: "Absolutely. All transactions come with downloadable invoices for your records.",
      },
      {
        header: "Can we pay after delivery?",
        text: "Pay-on-delivery is available for verified business clients and contract-based agreements.",
      },
      {
        header: "Do you offer discounts for large orders?",
        text: "Yes. Discounts are tiered based on order size, location, and product category.",
      },
      {
        header: "Can we track orders in real time?",
        text: "Yes. Your business dashboard allows you to monitor sourcing, dispatch, and delivery.",
      },
      {
        header: "How do we request custom crops or quantities?",
        text: 'Use the "Request" tab or contact your account rep for tailored sourcing.',
      },
      {
        header: "Do you work with schools, hotels, and event centers?",
        text: "Yes. We serve educational institutions, hospitality, government offices, and more.",
      },
      {
        header: "Do you handle food for events?",
        text: "We offer procurement services for weddings, conferences, and other events.",
      },
      {
        header: "What if I need help placing an order?",
        text: "You’ll have access to a dedicated account manager or live chat for instant help.",
      },
    ],
  },
  {
    topic: "Investment",
    accordionItems: [
      {
        header: "What is the Farmstarck investment feature?",
        text: "It allows individuals to invest in agriculture without farming physically.",
      },
      {
        header: "How does it work?",
        text: "You buy into stockpiles or crop cycles. Farmstarck handles the operations and you earn a return.",
      },
      {
        header: "What’s the minimum to invest?",
        text: "Between ₦50,000 and above for stock-backed or profit-sharing cycles.",
      },
      {
        header: "Is it a loan or equity?",
        text: "It’s a fixed-term investment with profit-sharing returns.",
      },
      {
        header: "How are profits shared?",
        text: "Investors earn 10–25% depending on crop, duration, and risk profile.",
      },
      {
        header: "What are the investment periods?",
        text: "Typically 3, 6, or 12 months. Longer terms may be available.",
      },
      {
        header: "How do I track my investment?",
        text: "You’ll receive access to a dashboard to monitor performance and updates.",
      },
      {
        header: "What can I invest in?",
        text: "Yams, maize, cassava, rice, tomatoes, and more — based on sourcing cycles.",
      },
      {
        header: "Are returns guaranteed?",
        text: "Returns are projected but not guaranteed. Risks are managed through experience and diversification.",
      },
      {
        header: "Who manages the farm operations?",
        text: "Farmstarck and its verified partners manage sourcing, storage, and sales.",
      },
      {
        header: "Can diaspora investors participate?",
        text: "Yes. We accept investment from verified diaspora users through supported payment channels.",
      },
      {
        header: "What is the stock investment model?",
        text: "Users can fund stock purchases (e.g. 1,000 bags of maize) which Farmstarck resells for a profit.",
      },
      {
        header: "Can I reinvest profits?",
        text: "Yes. Compounding and reinvestment options are supported.",
      },
      {
        header: "Is there a risk disclaimer?",
        text: "Yes. All investors are required to read and agree to our risk documentation.",
      },
    ],
  },
];

const Faq = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="max-w-5xl m-auto  w-full flex flex-col py-10 gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              Frequently Asked Questions
            </h2>
            <h1 className="font-subHeading text-center text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              What Most Of Our Customers Ask
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-white ">
        <div className="p-5 relative flex flex-col justify-center items-center">
          <div className="w-full max-w-5xl m-auto py-10 gap-y-10 flex flex-col justify-between items-center">
            <FaqComp faqItems={faqItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
