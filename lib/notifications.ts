export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New signal generated",
    message: "XAUUSD LONG signal is ready to view.",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Subscription renewed",
    message: "Your Premium plan renewed successfully.",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "3",
    title: "Target hit",
    message: "EURUSD SHORT signal reached its target.",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];