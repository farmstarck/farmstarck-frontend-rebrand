"use client";
import React, { useState } from "react";
import { Package, Bell, Activity, CheckCircle, Trash2 } from "lucide-react";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  notificationMutations,
  notificationQueries,
} from "@/queries/notification.queries";

import { AppActivity, AppNotification } from "@/types";

import { NotificationType } from "@/types/prisma-schema-types";
import DashboardLayout from "@/layouts/DashboardLayout";

type Tab = "notification" | "services" | "activities";

const NOTIFICATION_TYPE_MAP: Record<Tab, NotificationType | undefined> = {
  notification: undefined,
  services: NotificationType.service,
  activities: undefined,
};

const getCategoryIcon = (type: string) => {
  switch (type) {
    case "order":
      return <Package size={20} className="text-white" />;
    case "service":
      return <Bell size={20} className="text-white" />;
    case "payment":
    case "refund":
    case "wallet_funded":
    case "wallet_debited":
      return <CheckCircle size={20} className="text-white" />;
    default:
      return <Activity size={20} className="text-white" />;
  }
};

const Notifications = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("notification");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<
    string | null
  >(null);

  const isActivitiesTab = activeTab === "activities";

  // ── Queries ──────────────────────────────────────────────────────
  const { data: notifData, isLoading: loadingNotifs } = useQuery({
    ...notificationQueries.notifications({
      size: 20,
      type: activeTab === "services" ? NotificationType.service : undefined,
    }),
    enabled: !isActivitiesTab,
  });

  const { data: activityData, isLoading: loadingActivities } = useQuery({
    ...notificationQueries.activities({ size: 20 }),
    enabled: isActivitiesTab,
  });

  const isLoading = isActivitiesTab ? loadingActivities : loadingNotifs;

  // ── Mutations ────────────────────────────────────────────────────
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: notificationQueries.all });

  const { mutate: markRead } = useMutation({
    ...notificationMutations.markRead(),
    onSuccess: invalidate,
  });

  const { mutate: markAllRead } = useMutation({
    ...notificationMutations.markAllRead(),
    onSuccess: invalidate,
  });

  const { mutate: deleteNotification } = useMutation({
    ...notificationMutations.deleteNotification(),
    onSuccess: () => {
      invalidate();
      setShowDeleteModal(false);
      setNotificationToDelete(null);
    },
  });

  const handleDeleteClick = (id: string) => {
    setNotificationToDelete(id);
    setShowDeleteModal(true);
  };

  // ── Render items ─────────────────────────────────────────────────
  const renderItems = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    const items = isActivitiesTab
      ? (activityData?.items ?? [])
      : (notifData?.items ?? []);

    if (items.length === 0) {
      return (
        <div className="bg-white flex items-center flex-col gap-5 rounded-2xl p-8 text-center">
          <Image
            src="/assets/images/dashboard/buyer/notify.png"
            alt="no notifications"
            width={200}
            height={200}
          />
          <p className="text-gray-500">
            You do not have any {isActivitiesTab ? "activity" : "notification"}{" "}
            yet.
          </p>
        </div>
      );
    }

    return items.map((item) => {
      const isNotif = !isActivitiesTab;
      const notif = item as AppNotification;
      const activity = item as AppActivity;

      return (
        <div
          key={item.id}
          onClick={() => isNotif && !notif.isRead && markRead(item.id)}
          className={`rounded-2xl p-4 lg:p-6 border transition-shadow group cursor-pointer ${
            isNotif && !notif.isRead
              ? "border-primary/30 bg-primary/5"
              : "border-gray-200 bg-white hover:shadow-md"
          }`}
        >
          <div className="flex gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              {getCategoryIcon(item.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
                  {item.title}
                  {isNotif && !notif.isRead && (
                    <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full align-middle" />
                  )}
                </h3>
                {isNotif && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg shrink-0"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-0.5">{item.message}</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                {new Date(item.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
          Notifications
        </h1>
        {!isActivitiesTab && (notifData?.unreadCount ?? 0) > 0 && (
          <button
            onClick={() => markAllRead()}
            className="text-sm text-primary font-medium hover:underline"
          >
            Mark all as read ({notifData?.unreadCount})
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl w-full p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["notification", "services", "activities"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors capitalize ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-primary hover:bg-primary/10"
              }`}
            >
              {tab}
              {tab === "notification" && (notifData?.unreadCount ?? 0) > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifData?.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">{renderItems()}</div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        closeModal={setShowDeleteModal}
        onConfirm={() =>
          notificationToDelete && deleteNotification(notificationToDelete)
        }
        title="Delete Notification"
        message="Are you sure you want to delete this notification? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

Notifications.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Notifications;
