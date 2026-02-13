This Design Document translates the visual language of your chosen Dribbble inspiration into a structured technical guide for **GhostAudit AI**. Since you are building with the **MERN stack** and **Next.js**, we will focus on achieving that clean, high-contrast fintech aesthetic while maintaining the performance needed for a file-auditing tool.

---

# **Design Document: GhostAudit AI**

**Visual Theme:** Modern Professional / High-Trust Fintech
**Inspiration:** Clean layout, bold typography, and a structured data-heavy interface.

## **1. Design Principles**

* **Information Hierarchy:** Use clear borders and distinct containers to separate "Audit Progress," "File Details," and "Risk Reports."
* **Clarity over Decoration:** High contrast for readability. Use a monochromatic base with intentional accent colors for status indicators.
* **Action-Oriented:** Primary actions (Connect Drive, Start Audit) must be prominent and easily accessible.

## **2. Visual Identity & UI Components**

### **Color Palette (Dark Mode Focused)**

* **Background (Primary):** `#0A0A0A` (Deep Black for the canvas).
* **Surface/Cards:** `#161616` (Slightly lighter grey to create depth).
* **Accents (Success/Trust):** `#00FFA3` (Electric Green for "Human-Verified" or low-risk scores).
* **Accents (Warning):** `#FF4D4D` (Soft Red for high AI-likelihood or plagiarism).
* **Primary Action:** `#FFFFFF` (Pure white buttons with black text for maximum contrast).

### **Typography**

* **Headlines:** *Inter* or *Manrope* (Bold, 700-800 weight) for a technical, precise feel.
* **Body & Data:** *IBM Plex Mono* for file paths, scan IDs, and technical logs to emphasize the "Audit" nature of the tool.

### **Key UI Components**

* **The "Audit Gauge":** A circular or semi-circular progress bar that updates in real-time as the Node.js backend processes files.
* **Risk Cards:** Modular cards for each scanned document, showing a summary score and a "Quick Fix" button.
* **Watchfolder Dashboard:** A vertical list showing recently synced files from Google Drive, mimicking the "Recent Transactions" style in your inspiration.

## **3. Layout Structure (Next.js App Router)**

### **Navigation Sidebar (Left)**

* **Top:** Project Branding & Logo.
* **Middle:** Workspace selection (e.g., "Marketing Agency A," "Internal SEO").
* **Bottom:** User Settings & API Status.

### **Primary Dashboard (Center/Right)**

* **Global Stats Header:** Total files scanned, average AI-score across the organization, and total "Clean" documents.
* **Active Audits Section:** Real-time stream of files currently being analyzed by the **BullMQ** workers.
* **Audit Detail View:** A split-screen layout where the left side shows the original document and the right side highlights "High-Risk" sentences with suggestions for humanization.

## **4. UX & Motion (Framer Motion)**

* **Entry Animations:** Fade-in and slide-up transitions for new scan results to make the interface feel "alive."
* **Micro-interactions:** Subtle scaling on card hover and a "pulse" effect on the scanning indicator to signify background processing.
* **Loading States:** Skeleton screens that mimic the layout of the Audit Cards while the backend polls for data.

## **5. Design-to-Code Implementation (MERN)**

* **Next.js Components:** Use **Shadcn UI** as a base library, customized with the specific colors and typography mentioned above.
* **Real-time Updates:** Integrate **Socket.io** so the UI updates automatically when a file moves from "Pending" to "Audited" without a page refresh.
* **Responsive Breakpoints:** Prioritize a wide-screen desktop view for editors, with a simplified "Status-Only" mobile view for agency owners.

---
