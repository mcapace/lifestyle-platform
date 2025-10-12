import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { BottomNav } from "@/components/app/bottom-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {children}
      <BottomNav />
    </div>
  );
}

