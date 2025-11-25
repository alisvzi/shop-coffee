import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
import Sidebar from "../_components/layout/Sidebar/Sidebar";
import Topbar from "../_components/layout/Topbar/Topbar";

const menuItems = [
  { label: "داشبورد", icon: "☕", href: "/panel-user" },
  { label: "علاقه‌مندی‌ها", icon: "👥", href: "/panel-user/wishlist" },
  { label: "نظرات کاربران", icon: "👥", href: "/panel-user/comments" },
  {
    label: "تیکت‌ها",
    icon: "🍫",
    children: [
      { label: "لیست تیکت‌ها", href: "/panel-user/tickets" },
      { label: "ارسال تیکت‌ جدید", href: "/panel-user/tickets/send-ticket" },
    ],
  },
  { label: "جزئیات اکانت", icon: "⚙️", href: "/panel-user/account-detail" },
];

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar menuItems={menuItems} userRole={user?.role} userName={user?.name} />
      </div>
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
