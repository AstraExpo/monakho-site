"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/admin" className="mr-6 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
            Admin Portal
          </span>
        </Link>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-slate-900 text-white border-slate-700"
          >
            <nav className="flex flex-col space-y-4 mt-8">
              <Link
                href="/admin/events"
                className="text-lg font-medium hover:text-emerald-300 transition-colors"
              >
                Events
              </Link>
              <Link
                href="/admin/content"
                className="text-lg font-medium hover:text-emerald-300 transition-colors"
              >
                Content
              </Link>
              <Link
                href="/admin/about"
                className="text-lg font-medium hover:text-emerald-300 transition-colors"
              >
                About
              </Link>
              <Link
                href="/admin/merchandise"
                className="text-lg font-medium hover:text-emerald-300 transition-colors"
              >
                Merchandise
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/admin/events"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800 focus:bg-slate-800 focus:outline-none text-white"
                >
                  Events
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/admin/content"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800 focus:bg-slate-800 focus:outline-none text-white"
                >
                  Content
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/admin/about"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800 focus:bg-slate-800 focus:outline-none text-white"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/admin/merchandise"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800 focus:bg-slate-800 focus:outline-none text-white"
                >
                  Merchandise
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <Link href="/client">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-800"
            >
              View Site
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center space-x-2 text-lg font-medium hover:text-red-500 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
