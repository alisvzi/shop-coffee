"use client";
import { useSyncExternalStore } from "react";
import type { Notification } from "@/types/notification.interface";

type NotificationStoreState = {
  notifications: Notification[];
  dismissNotification: (id: string) => void;
  showNotification: (notification: Notification) => void;
};

// Internal store implementation without external dependencies
let state: NotificationStoreState = {
  notifications: [],
  dismissNotification: (id: string) => {
    state = {
      ...state,
      notifications: state.notifications.filter((n) => n.id !== id),
    };
    emitChange();
  },
  showNotification: (notification: Notification) => {
    state = {
      ...state,
      notifications: [...state.notifications, notification],
    };
    emitChange();
  },
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useNotificationStore<T>(selector: (s: NotificationStoreState) => T): T {
  const selected = useSyncExternalStore(subscribe, () => selector(getSnapshot()));
  return selected;
}