"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  CreditCard,
  Menu,
  Ghost,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/integrations", label: "Integrations", icon: FolderOpen },
  { href: "/dashboard/audits", label: "My Audits", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    // Optionally fetch user profile from an /api/auth/me endpoint
    // if you want to display their real name/avatar,
    // or keep using local storage just for user visual data (not auth token).
    // For now, let's keep the user object in localStorage just for the avatar name display,
    // but the actual auth protection is handled by middleware.
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      // Log out even if the server request fails
    }
    localStorage.removeItem("user");
    router.push("/login");
  };

  const NavContent = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 rounded-xl px-3 py-2.5 transition-all duration-200 group relative overflow-hidden ${
              isActive
                ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_#7c3aed]" />
            )}
            <item.icon
              size={20}
              className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
            />
            <span className="font-medium tracking-wide text-sm">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-72 border-r border-border/40 bg-card/30 backdrop-blur-xl lg:flex flex-col p-6 sticky top-0 h-screen z-30">
        <div className="mb-10 flex items-center space-x-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Ghost size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            GhostAudit
          </span>
        </div>

        <div className="flex-1 space-y-1">
          <NavContent />
        </div>

        <div className="mt-auto pt-6 border-t border-border/40">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/10 hover:bg-muted/80 transition-colors cursor-pointer group mb-2">
            <Avatar className="h-9 w-9 ring-2 ring-border/50 group-hover:ring-primary/50 transition-all">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
              />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium leading-none truncate group-hover:text-primary transition-colors">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-500/10 h-9 px-2"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-sm">Log out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Header (Mobile & Desktop) */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md px-4 lg:px-8 transition-all">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-muted-foreground hover:text-primary"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 p-6 border-r border-border/40 bg-background/95 backdrop-blur-xl z-[100]"
              >
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/50">
                      <Ghost size={24} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground">
                      GhostAudit
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <NavContent />
                <div className="absolute bottom-6 left-6 right-6">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10 border-red-500/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Breadcrumbs for Desktop */}
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <span className="hover:text-foreground transition-colors cursor-pointer">
                Dashboard
              </span>
              <span className="mx-2 text-border/40">/</span>
              <span className="font-medium text-foreground">
                {navItems.find((i) => i.href === pathname)?.label || "Overview"}
              </span>
            </div>

            {/* Mobile Title */}
            <span className="font-semibold md:hidden">
              {navItems.find((i) => i.href === pathname)?.label || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full ring-2 ring-border/50 hover:ring-primary/50 transition-all"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-border/40 bg-card/95 backdrop-blur-xl"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings/billing")}
                  className="cursor-pointer"
                >
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <div className="mx-auto max-w-7xl animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
