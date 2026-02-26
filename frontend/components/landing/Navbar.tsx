"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <Ghost className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          GhostAuditAI
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link
          href="#features"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          How it Works
        </Link>
        <Link
          href="#pricing"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Pricing
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <Button className="text-sm bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="text-sm bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
