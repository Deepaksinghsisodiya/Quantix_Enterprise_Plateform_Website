import fs from 'fs';
import path from 'path';

let cachedKnowledgeBase: string | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes cache

/**
 * Dynamically scans and extracts knowledge directly from the project files:
 * - README.md (UI Data Dictionary, Pages, Features, Pricing)
 * - FLOW_AND_API_DOCUMENTATION.md (Architecture, Endpoints, Integrations)
 * - POS_APP_T2_04_FRS_SPW_V2.md (Functional Requirements, Workflows)
 */
export function getDynamicProjectKnowledge(): string {
  const now = Date.now();
  if (cachedKnowledgeBase && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedKnowledgeBase;
  }

  const projectRoot = process.cwd();
  const knowledgeChunks: string[] = [];

  // 1. Read README.md (Comprehensive UI Content & Data Dictionary)
  const readmePath = path.join(projectRoot, 'README.md');
  if (fs.existsSync(readmePath)) {
    try {
      const readmeContent = fs.readFileSync(readmePath, 'utf-8');
      // Trim to essential dictionary summary to fit context window
      knowledgeChunks.push(`=== QUANTIX WEBSITE DATA DICTIONARY (FROM README.md) ===\n${readmeContent.slice(0, 12000)}`);
    } catch {
      // Continue
    }
  }

  // 2. Read FLOW_AND_API_DOCUMENTATION.md
  const flowDocPath = path.join(projectRoot, 'FLOW_AND_API_DOCUMENTATION.md');
  if (fs.existsSync(flowDocPath)) {
    try {
      const flowContent = fs.readFileSync(flowDocPath, 'utf-8');
      knowledgeChunks.push(`=== ARCHITECTURE & API FLOWS ===\n${flowContent.slice(0, 4000)}`);
    } catch {
      // Continue
    }
  }

  // 3. Fallback Core Knowledge if file read is unavailable
  if (knowledgeChunks.length === 0) {
    knowledgeChunks.push(`
QUANTIX ENTERPRISE POS SPECIFICATIONS:
- Multi-Location POS: Centralized master catalog, regional pricing matrices, and 1-click global menu rollouts.
- Kitchen Display System (KDS): Station routing, course pacing, and prep-time tracking.
- Supply Chain & Warehouse: Par-level automated replenishment, inter-store transfers with audit trails, recipe costing.
- Omnichannel Fulfillment: In-store, online, mobile kiosks, and delivery aggregation (DoorDash/UberEats).
- Offline Engine: Autonomous zero-downtime offline billing with auto cloud sync upon reconnection.
- Hardware: 100% hardware-agnostic (Windows touch terminals, iPads, Android registers, thermal printers).
- Pricing: Custom volume-tiered enterprise pricing + "Claim 3 Months Free Trial" program.
`);
  }

  cachedKnowledgeBase = knowledgeChunks.join('\n\n');
  lastCacheTime = now;
  return cachedKnowledgeBase;
}
