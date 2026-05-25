"use client";
const PaymentProcessing = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6">
    <div className="w-32 h-32 rounded-full border-4 border-dashed border-primary animate-spin" />
    <h2 className="text-2xl font-bold text-primary">{text}</h2>
    <p className="text-gray-600">Please don’t close this page</p>
  </div>
);

export default PaymentProcessing;
