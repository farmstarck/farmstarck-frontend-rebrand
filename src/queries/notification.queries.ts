import NotificationService from "@/services/notification.service";
import {
  AppActivity,
  AppNotification,
  QueryActivityParams,
  QueryNotificationParams,
} from "@/types";

type PaginatedResponse<T> = {
  items: T[];
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  unreadCount?: number;
};

export const notificationQueries = {
  all: ["notifications"] as const,

  notifications: (params: QueryNotificationParams) => ({
    queryKey: [...notificationQueries.all, "list", params] as const,
    queryFn: () => NotificationService.getNotifications(params),
    select: (res: { data: AppNotification[]; unreadCount?: number; pagination: { totalPages: number; totalRecords: number; currentPage: number } }): PaginatedResponse<AppNotification> => ({
      items: res.data,
      unreadCount: res.unreadCount,
      totalPages: res.pagination.totalPages,
      totalRecords: res.pagination.totalRecords,
      currentPage: res.pagination.currentPage,
    }),
  }),

  activities: (params: QueryActivityParams) => ({
    queryKey: [...notificationQueries.all, "activities", params] as const,
    queryFn: () => NotificationService.getActivities(params),
    select: (res: { data: AppActivity[]; pagination: { totalPages: number; totalRecords: number; currentPage: number } }): PaginatedResponse<AppActivity> => ({
      items: res.data,
      totalPages: res.pagination.totalPages,
      totalRecords: res.pagination.totalRecords,
      currentPage: res.pagination.currentPage,
    }),
  }),

  unreadCount: () => ({
    queryKey: [...notificationQueries.all, "unread-count"] as const,
    queryFn: NotificationService.getUnreadCount,
    select: (res: { count: number }) => res.count,
  }),
};

export const notificationMutations = {
  markRead: () => ({
    mutationFn: (id: string) => NotificationService.markRead(id),
  }),
  markAllRead: () => ({
    mutationFn: () => NotificationService.markAllRead(),
  }),
  deleteNotification: () => ({
    mutationFn: (id: string) => NotificationService.deleteNotification(id),
  }),
};
