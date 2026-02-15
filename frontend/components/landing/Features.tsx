"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Lock, FileText, Search, UserCheck } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "AI Detection Proof",
    description: "Scan your content against multiple AI detection models to ensure it passes as human-written.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get detailed reports in seconds. Our engine processes documents with lightning speed.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your documents are encrypted and processed securely. We never store your data longer than needed.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "View sentence-by-sentence breakdowns of AI probability and potential flags.",
  },
  {
    icon: Search,
    title: "Plagiarism Check",
    description: "Cross-reference your content with billions of web pages to ensure originality.",
  },
  {
    icon: UserCheck,
    title: "Humanizer Tool",
    description: "Automatically rewrite flagged content to sound more natural and human-like.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Everything you need to <span className="text-primary">audit with confidence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Our platform provides a comprehensive suite of tools to help students, writers, and professionals verify the authenticity of their work.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
