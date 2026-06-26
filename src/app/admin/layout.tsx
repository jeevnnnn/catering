import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | KAÈON Catering",
  description: "Administrative console to manage luxury catering leads, bookings, and revenue pipelines.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
