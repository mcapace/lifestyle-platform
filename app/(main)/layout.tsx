import { BottomNav } from "@/components/app/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Temporarily removed auth check for demo purposes
  // const user = await getCurrentUser();
  // if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Demo Badge */}
      <div className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-brand-500/90 backdrop-blur-sm rounded-full">
        <span className="text-xs font-medium text-white">DEMO</span>
      </div>
      
      {children}
      <BottomNav />
    </div>
  );
}

