// src/app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import { Sidebar } from "../components/molecules/sidebar/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <main className="p-6">{children}</main>
    </div>
  );
}
