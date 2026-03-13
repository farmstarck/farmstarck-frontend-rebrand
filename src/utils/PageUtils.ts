import { Product } from "@/types/prisma-schema-types";
import { Order } from "@/types/products";
import toast from "react-hot-toast";

export const ErrorMessage = (
  message: string,
  bg: "red" | "blue" | "orange" = "red",
) => {
  return toast.error(message, {
    position: "top-right",
    duration: 3000,
    style: {
      backgroundColor:
        bg === "red" ? "#dc2626" : bg === "orange" ? "#ea580c" : "#dc2626",
      color: "#ffffff",
      fontSize: "14px",
    },
  });
};

export const SuccessMessage = (message: string) => {
  return toast.success(message, {
    position: "top-right",
    duration: 3000,
    style: {
      backgroundColor: "white",
      color: "#00c700",
      fontSize: "14px",
    },
  });
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-primary text-white";
    case "ready to ship":
      return "bg-blue-500 text-white";
    case "pending":
      return "bg-yellow-500 text-white";
    case "shipped":
      return "bg-primary text-white";
    case "cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

// utils/PageUtils.ts — updated orders mock
export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "32130QW11",
    items: [
      {
        productId: 1,
        title: "Full Crate of Egg",
        quantity: 2,
        price: 15000,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
        sku: "FOO-LIV-000679",
        available: true,
      },
      {
        productId: 2,
        title: "1 Basket of Tomatoes",
        quantity: 2,
        price: 215000,
        image: "/assets/images/marketplaces/tomatoes.png",
        size: "Basket",
        sku: "FOO-LIV-000679",
        available: false, // no longer available
      },
    ],
    totalAmount: 132000,
    itemsTotal: 140000,
    deliveryFee: 5000,
    serviceCharge: -13000,
    paymentMethod: "Wallet Balance - Instant Settlement",
    status: "delivered",
    date: "2024-01-15",
    location: "Lagos",
  },
  {
    id: "2",
    orderNumber: "32131QW22",
    items: [
      {
        productId: 3,
        title: "Full Crate of Egg",
        quantity: 2,
        price: 15000,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
        sku: "FOO-LIV-000679",
        available: true,
      },
      {
        productId: 4,
        title: "1 Basket of Tomatoes",
        quantity: 2,
        price: 215000,
        image: "/assets/images/marketplaces/tomatoes.png",
        size: "Basket",
        sku: "FOO-LIV-000679",
        available: true,
      },
    ],
    totalAmount: 132000,
    itemsTotal: 140000,
    deliveryFee: 5000,
    serviceCharge: -13000,
    paymentMethod: "Wallet Balance - Instant Settlement",
    status: "shipped",
    date: "2024-01-14",
    location: "Lagos",
  },
  {
    id: "3",
    orderNumber: "32132QW33",
    items: [
      {
        productId: 5,
        title: "Full Crate of Egg",
        quantity: 2,
        price: 15000,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
        sku: "FOO-LIV-000679",
        available: true,
      },
      {
        productId: 6,
        title: "1 Basket of Tomatoes",
        quantity: 2,
        price: 215000,
        image: "/assets/images/marketplaces/apples.png",
        size: "Basket",
        sku: "FOO-LIV-000679",
        available: true,
      },
      {
        productId: 7,
        title: "1 Basket of Tomatoes",
        quantity: 2,
        price: 215000,
        image: "/assets/images/marketplaces/fertilizer.png",
        size: "Basket",
        sku: "FOO-LIV-000679",
        available: true,
      },
      {
        productId: 8,
        title: "1 Basket of Bananas",
        quantity: 2,
        price: 215000,
        image: "/assets/images/marketplaces/bananas.png",
        size: "Basket",
        sku: "FOO-LIV-000679",
        available: true,
      },
    ],
    totalAmount: 132000,
    itemsTotal: 140000,
    deliveryFee: 5000,
    serviceCharge: -13000,
    paymentMethod: "Wallet Balance - Instant Settlement",
    status: "pending",
    date: "2024-01-13",
    location: "Lagos",
  },
  {
    id: "4",
    orderNumber: "32133QW44",
    items: [
      {
        productId: 9,
        title: "Full Crate of Egg",
        quantity: 2,
        price: 15000,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
        sku: "FOO-LIV-000679",
        available: true,
      },
    ],
    totalAmount: 132000,
    itemsTotal: 140000,
    deliveryFee: 5000,
    serviceCharge: -13000,
    paymentMethod: "Wallet Balance - Instant Settlement",
    status: "partially_shipped",
    date: "2024-01-12",
    location: "Lagos",
  },
  {
    id: "5",
    orderNumber: "32134QW55",
    items: [
      {
        productId: 10,
        title: "Full Crate of Egg",
        quantity: 2,
        price: 15000,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
        sku: "FOO-LIV-000679",
        available: false,
      },
    ],
    totalAmount: 132000,
    itemsTotal: 140000,
    deliveryFee: 5000,
    serviceCharge: -13000,
    paymentMethod: "Wallet Balance - Instant Settlement",
    status: "cancelled",
    date: "2024-01-11",
    location: "Lagos",
  },
  {
    id: "6",
    orderNumber: "32135QW66",
    items: [
      {
        productId: 11,
        title: "Full Crate of Egg",
        quantity: 2,
        price: 15000,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
        sku: "FOO-LIV-000679",
        available: true,
      },
    ],
    totalAmount: 132000,
    itemsTotal: 140000,
    deliveryFee: 5000,
    serviceCharge: -13000,
    paymentMethod: "Wallet Balance - Instant Settlement",
    status: "partially_delivered",
    date: "2024-01-10",
    location: "Lagos",
  },
]

export const getInitials = (name?: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || parts[0]?.[1] || "";
  return (first + second).toUpperCase();
};

export const consumeRedirectAfterAuth = () => {
  const redirect = localStorage.getItem("redirectAfterAuth");
  if (redirect) {
    localStorage.removeItem("redirectAfterAuth");
    return redirect;
  }
  return null;
};

export const buildWhatsappMessage = (product: Product, quantity: number) => {
  const unitPrice = product.pricePerUnit - (product.discountPerUnit ?? 0);

  const totalAmount = unitPrice * quantity;

  return `
Hello Farmstarck,

I’m interested in buying this product from your store.

Product: ${product.name}
Quantity: ${quantity}
Price: ₦${totalAmount.toLocaleString()}

Location: ${product.location}

Please let me know the next steps.
`.trim();
};

// export const buildCheckoutWhatsappMessage = (order: Order) => {
//   const items= order.items.map(item =>
//         `• ${item.product.name} × ${item.quantity} — ₦${(
//           item.product.pricePerUnit * item.quantity
//         ).toLocaleString()}`
//     )
//     .join('\n');

//   return `
// Hello 👋

// I’ve placed an order on your store and would like to complete it via WhatsApp.

// 🧾 Order Ref: ${order.orderId}

// 🛒 Items:
// ${items}

// 🚚 Delivery Method: ${order.shippingMethod}
// 📍 Address: ${order.address?.street + " " + order.address?.city + ", " + order.address?.state + ", " + order.address?.country}

// 📞 Phone: ${order.buyer.phoneNumber}

// 💰 Total: ₦${order.totalAmount.toLocaleString()}

// Please confirm availability and next steps.
// `.trim();
// }
