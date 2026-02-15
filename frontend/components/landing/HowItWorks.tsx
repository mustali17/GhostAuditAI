"use client"

import { motion } from "framer-motion"
import { UploadCloud, ScanSearch, FileCheck } from "lucide-react"

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Document",
    description: "Drag and drop your PDF or Word document into our secure scanner.",
  },
  {
    icon: ScanSearch,
    title: "AI Analysis",
    description: "Our triple-threat engine analyzes distinct patterns, watermarks, and syntax.",
  },
  {
    icon: FileCheck,
    title: "Get Results",
    description: "Receive a comprehensive report with an authentically human score.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How it Works
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to verify your content's authenticity.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-background border-4 border-muted group-hover:border-primary transition-colors flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <step.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
