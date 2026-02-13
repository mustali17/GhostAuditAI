# GhostAudit AI - Implementation Todo List

## 1. Project Initialization & Architecture
- [ ] **Frontend Setup**
    - [ ] Initialize Next.js 15 project with App Router.
    - [ ] Install and configure Tailwind CSS.
    - [ ] Set up Shadcn UI components (Card, Button, Progress, etc.).
    - [ ] Configure custom color palette (Deep Black #0A0A0A, Electric Green #00FFA3, etc.) per Design Doc.
- [ ] **Backend Setup**
    - [ ] Initialize Node.js/Express server.
    - [ ] Set up MongoDB connection.
    - [ ] Configure Redis connection.
    - [ ] Set up BullMQ for background job processing.
- [ ] **Infrastructure**
    - [ ] Set up S3 or Cloudinary for temporary file storage.
    - [ ] Configure Socket.io for real-time frontend-backend communication.

## 2. Authentication & User Management
- [ ] **Database Models**
    - [ ] Create `User` schema.
    - [ ] Create `Organization` schema (for Agency workspaces).
    - [ ] Create `UserTier` schema (Growth, Agency plans).
- [ ] **Auth Implementation**
    - [ ] Implement Sign Up / Login flow.
    - [ ] Implement specific "Agency Owner" onboarding flow.
    - [ ] Create User Settings page.

## 3. "Watchfolder" Integration (Core Feature A)
- [ ] **Google Drive Integration**
    - [ ] Implement Google OAuth for Drive access.
    - [ ] Create UI for selecting a "Watchfolder".
    - [ ] Implement backend logic to list files in a folder.
    - [ ] **File Syncing**:
        - [ ] Create watcher/webhook to detect new `.docx` and `.pdf` files.
        - [ ] Implement file download/pull mechanism to backend.

## 4. The Triple-Threat Audit Engine (Core Feature B)
- [ ] **Job Queue System**
    - [ ] Create BullMQ worker for file processing.
    - [ ] Implement text extraction from `.docx` and `.pdf`.
- [ ] **Audit Services**
    - [ ] **AI Detection**: Integrate external API (e.g., Originality.ai) to get AI probability score.
    - [ ] **Plagiarism Check**: Implement cross-referencing logic (via API).
    - [ ] **Fact-Check**: Implement basic fact-check flagging (LLM based).
- [ ] **Result Storage**
    - [ ] Create `AuditResult` schema in MongoDB.
    - [ ] Store detailed analysis (risk sentences, scores) in DB.

## 5. Dashboard UI (Core Feature B & Design Doc)
- [ ] **Main Layout**
    - [ ] Build Sidebar Navigation (Branding, Workspace selector, Settings).
    - [ ] Build Mobile-responsive view.
- [ ] **Dashboard Widgets**
    - [ ] **Global Stats Header**: Total files, Avg AI score, Clean docs count.
    - [ ] **Active Audits**: Real-time list of files currently processing (Socket.io updates).
    - [ ] **Watchfolder List**: Vertical list of recently synced files.
- [ ] **Visual Elements**
    - [ ] Implement "Audit Gauge" (Circular progress bar).
    - [ ] Create Risk Cards with summary scores and status colors.

## 6. Audit Detail & "Humanizer" Editor (Core Feature D)
- [ ] **Detail View UI**
    - [ ] Build split-screen layout: Original Document vs. Analysis.
    - [ ] Implement highlighting system for "Robotic" or "Plagiarized" sentences.
- [ ] **Humanizer Logic**
    - [ ] Integrate LLM (OpenAI/Anthropic) to suggest 3 human-sounding rewrites for flagged sentences.
    - [ ] Implement inline text replacement for approved suggestions.
- [ ] **Finalization**
    - [ ] "Finalize" button to lock the audit and generate report.

## 7. Reporting & Exports (Core Feature C)
- [ ] **Trust Reports**
    - [ ] backend logic to generate PDF report with results.
    - [ ] Create public Next.js page for "Verified by GhostAudit" certificates.
    - [ ] Implement White-labeling (replace logo for Agency Tier).

## 8. Scalability & Monetization
- [ ] **Tier Enforcement**
    - [ ] Limit "Growth" tier to 50 docs/month.
    - [ ] Enable bulk processing for "Agency" tier.
- [ ] **Performance Optimization**
    - [ ] Optimize BullMQ settings for processing speed (< 45s target).
