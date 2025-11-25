import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
import Sidebar from "../_components/layout/Sidebar/Sidebar";
import Topbar from "../_components/layout/Topbar/Topbar";

const menuItems = [
  { label: "پیشخوان", icon: "☕", href: "/panel-admin" },
  { label: "محصولات", icon: "👥", href: "/panel-admin/products" },
  { label: " کاربران", icon: "👥", href: "/panel-admin/users" },
  { label: " کامنت‌ها", icon: "👥", href: "/panel-admin/comments" },
  {
    label: "تیکت‌ها",
    href: "/panel-admin/tickets",
    icon: "👥",
  },
  { label: " تحفیفات", icon: "⚙️", href: "/panel-admin/discounts" },
];

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authUser();

  if (user) {
    if (user.role !== "ADMIN") redirect("/signin");
  } else {
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
