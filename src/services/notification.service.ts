import api from "@/lib/axios-client";
import { QueryNotificationParams, QueryActivityParams } from "@/types";

const NotificationService = {
  getNotifications: (params: QueryNotificationParams) =>
    api.get("/api/notifications", { params }).then((r) => r.data.data),

  getActivities: (params: QueryActivityParams) =>
    api
      .get("/api/notifications/activities", { params })
      .then((r) => r.data.data),

  getUnreadCount: () =>
    api.get("/api/notifications/unread-count").then((r) => r.data.data),

  markRead: (id: string) =>
    api.patch(`/api/notifications/${id}/read`).then((r) => r.data),

  markAllRead: () =>
    api.patch("/api/notifications/read-all").then((r) => r.data),

  deleteNotification: (id: string) =>
    api.delete(`/api/notifications/${id}`).then((r) => r.data),
};

export default NotificationService;
