import type { Metadata } from "next";

import { authUser } from "@/utils/serverHelpers";
import { Footer } from "./_components/layouts/footer/footer";
import { Header } from "./_components/layouts/header";

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی قهوه | Coffee - صفحه اصلی",
  description: "Coffee project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check USER LOGIN
  const user = await authUser();
  return (
    <div className="min-h-screen">
      <Header isLogin={user ? true : false} />

      {children}
      <Footer />
    </div>
  );
}
