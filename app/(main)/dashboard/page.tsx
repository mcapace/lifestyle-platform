import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Heart, MessageSquare, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  // Fetch user data
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      _count: {
        select: {
          sentMessages: true,
          receivedMessages: true,
          likes: true,
          matches: true,
        },
      },
    },
  });

  if (!userData) return null;

  const stats = [
    {
      title: "Profile Views",
      value: 0, // TODO: Implement view tracking
      icon: Eye,
    },
    {
      title: "Likes Received",
      value: userData._count.likes,
      icon: Heart,
    },
    {
      title: "Messages",
      value: userData._count.sentMessages + userData._count.receivedMessages,
      icon: MessageSquare,
    },
    {
      title: "Connections",
      value: userData._count.matches,
      icon: Users,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-stone-100 mb-2">
              Welcome back, {userData.name}
            </h1>
            <p className="text-stone-400">
              {userData.verified ? (
                <span className="inline-flex items-center gap-2 text-green-400">
                  <CheckCircle size={16} />
                  Verified Member
                </span>
              ) : (
                <span className="text-amber-400">
                  Complete verification to unlock all features
                </span>
              )}
            </p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src={userData.avatar || undefined} />
            <AvatarFallback className="bg-amber-700 text-white text-xl">
              {userData.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Verification Alert */}
        {!userData.verified && (
          <Card className="bg-amber-950/20 border-amber-900">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-amber-200 mb-2">
                    Complete Your Verification
                  </h3>
                  <p className="text-stone-400 mb-4">
                    Verified members get more visibility, trust from the community,
                    and access to exclusive features.
                  </p>
                  <Link href="/dashboard/settings/verification">
                    <Button className="bg-amber-700 hover:bg-amber-600">
                      Start Verification
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Activity Feed */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-stone-100">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-stone-500">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No recent activity</p>
              <p className="text-sm mb-4">
                Start exploring to see your activity here
              </p>
              <Link href="/dashboard/explore">
                <Button className="bg-amber-700 hover:bg-amber-600">
                  Explore Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

