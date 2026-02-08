import { Product } from "@/types/prisma-schema-types";
import { Order } from "@/types/products";
import toast from "react-hot-toast";

export const ErrorMessage = (
  message: string,
  bg: "red" | "blue" | "orange" = "red",
) => {
  return toast.error(message, {
    position: "top-right",
    duration: 4000,
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
    duration: 4000,
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

export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "32130QW11",
    items: [
      {
        productId: 1,
        title: "Yam 1 Tuber",
        quantity: 2,
        price: 2500,
        image: "/assets/images/marketplaces/smallYam.png",
        size: "Tuber",
      },
    ],
    totalAmount: 5000,
    status: "delivered",
    date: "2024-01-15",
    location: "Lagos",
  },
  {
    id: "2",
    orderNumber: "32131QW22",
    items: [
      {
        productId: 2,
        title: "Bull Rice",
        quantity: 1,
        price: 47000,
        image: "/assets/images/marketplaces/rice.png",
        size: "Bag",
      },
      {
        productId: 3,
        title: "Farm Eggs",
        quantity: 2,
        price: 4700,
        image: "/assets/images/marketplaces/eggs.png",
        size: "Crate",
      },
    ],
    totalAmount: 56400,
    status: "ready to ship",
    date: "2024-01-14",
    location: "Lagos",
  },
  {
    id: "3",
    orderNumber: "32132QW33",
    items: [
      {
        productId: 5,
        title: "Green Apple",
        quantity: 1,
        price: 64200,
        image: "/assets/images/marketplaces/apples.png",
        size: "Carton",
      },
    ],
    totalAmount: 64200,
    status: "pending",
    date: "2024-01-13",
    location: "Lagos",
  },
  {
    id: "4",
    orderNumber: "32133QW44",
    items: [
      {
        productId: 7,
        title: "Frozen Cow Meat",
        quantity: 3,
        price: 5800,
        image: "/assets/images/marketplaces/meat.png",
        size: "Kilogram",
      },
    ],
    totalAmount: 17400,
    status: "shipped",
    date: "2024-01-12",
    location: "Lagos",
  },
  {
    id: "5",
    orderNumber: "32134QW55",
    items: [
      {
        productId: 8,
        title: "Cassava Fertilizer",
        quantity: 1,
        price: 20600,
        image: "/assets/images/marketplaces/fertilizer.png",
        size: "Each",
      },
    ],
    totalAmount: 20600,
    status: "cancelled",
    date: "2024-01-11",
    location: "Lagos",
  },
];

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
