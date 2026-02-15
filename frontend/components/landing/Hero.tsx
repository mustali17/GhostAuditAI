"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, FileSearch, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto max-w-5xl text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-secondary mb-8"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-secondary-foreground">Next-Gen AI Content Detection</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
        >
          <span className="text-foreground">
            Scan. Verify. <br className="hidden md:block" />
          </span>
          <span className="text-primary">Trust Expected.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Advanced AI detection and humanization for your documents. Ensure your content passes every scan with confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
              Start Scanning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/20 hover:bg-primary/5">
              How it Works
            </Button>
          </Link>
        </motion.div>

        {/* Floating Cards Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="p-6 rounded-2xl bg-card border shadow-sm backdrop-blur-sm">
            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">99.9% Accuracy</h3>
            <p className="text-muted-foreground">Train on millions of data points to detect AI-generated text.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm backdrop-blur-sm -mt-6 md:-mt-12 bg-primary/5 border-primary/20">
             <Sparkles className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Humanizer AI</h3>
            <p className="text-muted-foreground">Rewrite AI content to bypass detectors while maintaining meaning.</p>
          </div>
           <div className="p-6 rounded-2xl bg-card border shadow-sm backdrop-blur-sm">
            <FileSearch className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Detailed Reports</h3>
            <p className="text-muted-foreground">Get sentence-by-sentence analysis and probability scores.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
