"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, FileSearch, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 pt-24 pb-16">
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-500/15 rounded-full blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto max-w-6xl flex flex-col gap-12 lg:flex-row lg:items-center z-10">
        <div className="max-w-xl space-y-8 text-center lg:text-left mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 shadow-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Trusted AI content verification for teams
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              Scan, verify, and{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                humanize every document
              </span>
              .
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              GhostAuditAI combines multi-model AI detection with an intelligent humanizer so your content passes
              scrutiny—without sacrificing voice, nuance, or intent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch lg:items-center lg:gap-4"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="group h-14 w-full px-8 text-base md:text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                Start free audit
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-14 w-full px-8 text-base md:text-lg border-primary/25 bg-background/60 hover:bg-primary/5"
              >
                Watch it work
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border border-background bg-gradient-to-br from-primary to-purple-500" />
              <div className="h-8 w-8 rounded-full border border-background bg-muted" />
              <div className="h-8 w-8 rounded-full border border-background bg-primary/70" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-left text-xs text-muted-foreground sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-foreground">4.8 / 5</p>
                <p>Average rating from power users</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">1,200+</p>
                <p>Teams verifying content monthly</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">99.9%</p>
                <p>Detection precision across models</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right-side visual card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-lg"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/40 via-purple-500/40 to-transparent opacity-70 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border bg-card/90 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b bg-muted/60 px-5 py-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Live AI audit · Document.pdf
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                Real-time
              </span>
            </div>

            <div className="grid gap-4 px-5 py-5 md:grid-cols-[1.4fr,1fr]">
              <div className="space-y-3">
                <div className="rounded-xl border bg-background/70 p-3">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Authenticity score</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                      Human-like
                    </span>
                  </div>
                  <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="absolute inset-y-0 left-0 w-[84%] rounded-full bg-gradient-to-r from-emerald-400 to-primary" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>84% human-written</span>
                    <span>Flagged segments: 3</span>
                  </div>
                </div>

                <div className="space-y-2 rounded-xl border bg-background/70 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Detector breakdown</span>
                    <span className="text-[10px] text-muted-foreground">Multi-model analysis</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-muted/60 p-2">
                      <p className="text-[11px] text-muted-foreground">Model A</p>
                      <p className="text-sm font-semibold text-foreground">Human</p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-2">
                      <p className="text-[11px] text-muted-foreground">Model B</p>
                      <p className="text-sm font-semibold text-foreground">Borderline</p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-2">
                      <p className="text-[11px] text-muted-foreground">Model C</p>
                      <p className="text-sm font-semibold text-foreground">Human</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border bg-background/70 p-3 text-xs">
                <p className="text-[11px] font-medium text-muted-foreground">Suggested humanization</p>
                <div className="rounded-lg bg-muted/70 p-2 text-[11px] leading-relaxed">
                  <p className="text-muted-foreground">
                    “Our findings indicate a{" "}
                    <span className="font-semibold text-foreground">high confidence</span> that this document reads as
                    naturally human. We recommend light rephrasing in 3 sentences to further diversify structure.”
                  </p>
                </div>
                <button className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-primary/90 px-3 py-2 text-[11px] font-medium text-primary-foreground hover:bg-primary">
                  Apply one-click humanizer
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
