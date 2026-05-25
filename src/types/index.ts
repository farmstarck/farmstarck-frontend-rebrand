import {
  ActivityType,
  NotificationType,
  OrderStatus,
  PaymentMethod,
  TransactionType,
} from "./prisma-schema-types";

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface WishlistItemResponse {
  id: string;
  wishlistId: string;
  productId: string | null;
  productTitle: string;
  productImage: string;
  productPrice: number;
  productSku: string | null;
  isAvailable: boolean;
  livePrice: number;
  createdAt: string;
}

export interface AddAddressProps {
  street: string;
  landmark?: string;
  phoneNumber: string;
  recipientName: string;
  email?: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

export interface FetchBuyerOverResponse {
  completedOrder: number;
  cancelledOrder: number;
}

export type TimeFilterOption =
  | "today"
  | "week"
  | "lastweek"
  | "month"
  | "year"
  | "custom";

export interface FetchBuyerOrdersParams {
  page?: number;
  size?: number;
  status?: OrderStatus;
  date?: TimeFilterOption;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

export interface RateProductPayload {
  productId: string;
  orderId: string;
  rating: number;
  comment?: string;
}

export interface RateExperiencePayload {
  orderId: string;
  rating: number;
  comment: string;
}

export interface RequestRefundPayload {
  orderId: string;
  reason?: string;
}

export interface WalletPaymentDetailsDto {
  paymentMethod: PaymentMethod;
  paymentReference: string;
}

export interface FundWalletPayload {
  paymentDetails: WalletPaymentDetailsDto;
}

export type QueryTransactionParams = {
  page?: number;
  size?: number;
  type?: TransactionType;
  date?: TimeFilterOption;
  startDate?: string;
  endDate?: string;
  search?: string;
};

export type InitiateWalletPaymentPayload = {
  paymentMethod: PaymentMethod;
  amount: number;
  email: string;
  callback_url: string;
};

export type WalletInfo = {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  createdAt: string;
};

export type WalletSummary = {
  balance: number;
  totalCredits: number;
  totalDebits: number;
  creditPercentage: number;
  debitPercentage: number;
};

export type WalletTransaction = {
  id: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  reference?: string | null;
  description?: string | null;
  createdAt: string;
};

export type WalletTransactionsResponse = {
  message: string;
  transactions: WalletTransaction[];
  pagination: {
    currentPage: number;
    size: number;
    totalRecords: number;
    totalPages: number;
  };
};

export type QueryNotificationParams = {
  page?: number;
  size?: number;
  type?: NotificationType;
  isRead?: boolean;
};

export type QueryActivityParams = {
  page?: number;
  size?: number;
  type?: ActivityType;
};

export type AppNotification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
};

export type AppActivity = {
  id: string;
  userId: string;
  type: ActivityType;
  title: string;
  message: string;
  metadata?: Record<string, any>;
  createdAt: string;
};

export type CreateMerchantPayload = {
  shopName: string;
  businessCategory: string;
  businessEmail: string;
  phoneNumber: string;
  businessAddress: string;
  businessState?: string;
  businessLga?: string;
  businessLogo?: File;
  proofOfAddress?: File;
};

export type CreateFarmerPayload = {
  farmName: string;
  farmType: string;
  farmAddress: string;
  farmState?: string;
  farmLga?: string;
  produceTypes?: string;
  farmSize?: number;
  proofOfOwnership?: File;
  farmPhoto?: File;
  proofOfAddress?: File;
};

export type FetchSellerOverResponse = {
  totalRevenue: number;
  ordersToday: number;
  totalListedProducts: number;
  bestSellingProduct?: string;
};

export type SellerOrdersParams = {
  page?: number;
  size?: number;
  status?: OrderStatus;
  date?: string;
  startDate?: string;
  endDate?: string;
};

export const QUANTITY_TYPES = [
  { value: "bulk", label: "Bulk" },
  { value: "unit", label: "Unit" },
];
export const COUNT_TYPES = [
  { value: "pieces", label: "Pieces" },
  { value: "dozen", label: "Dozen" },
  { value: "kilogram", label: "Kilogram" },
  { value: "carton", label: "Carton" },
  { value: "liter", label: "Liter" },
  { value: "crate", label: "Crate" },
  { value: "bag", label: "Bag" },
  { value: "basket", label: "Basket" },
  { value: "each", label: "Each" },
  { value: "pack", label: "Pack" },
];
export const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "fairly_used", label: "Fairly Used" },
  { value: "seller_refurbished", label: "Seller Refurbished" },
  { value: "manufacturer_refurbished", label: "Manufacturer Refurbished" },
  { value: "other", label: "Other" },
];
export const PRODUCE_TYPES = [
  { value: "fresh", label: "Fresh Produce" },
  { value: "processed", label: "Processed" },
];

export type QueryPayoutParams = {
  page?: number;
  size?: number;
  status?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
};

export type CreateBankPayload = {
  accountNumber: string;
  accountHolderName: string;
  isDefault?: boolean;
};

export type BlogQueryParams = {
  search?: string;
  tag?: string;
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
};
