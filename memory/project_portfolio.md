---
name: Portfolio Project State
description: Key files, brand positioning, and content decisions for the portfolio frontend site
type: project
---

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS 4 + Framer Motion

**Brand positioning (as of 2026-05-10):** "Full Stack & AI Integration Engineer"

**Key content files:**
- SEO/meta: `index.html`
- Hero section: `src/components/sections/hero.tsx`
- Skills data: `src/data/skills.ts` + `src/components/sections/skills.tsx`
- Projects data: `src/data/projects.ts`
- Experience: `src/components/sections/experience.tsx`
- About: `src/components/sections/about.tsx`
- Footer: `src/components/sections/footer.tsx`
- Contact: `src/components/sections/contact.tsx`

**Skills categories (4 columns):** Frontend · Backend · AI/ML · Tools & DevOps

**Featured project order:** AI Helpdesk Agent (first/featured) → SPile+ → others

**AI Helpdesk Agent project:** RAG pipeline with LangChain + Pinecone + OpenAI, 90% support query reduction. Image placeholder at `/images/ai-helpdesk.png` (needs to be added).

**AI skill images:** langchain.png, pinecone.png, openai.png, rag.png, prompt-engineering.png, agentic-ai.png, nestjs.png, docker.png, github-actions.png — all need to be placed in `/public/images/skills/`.

**Why:** User rebranded from "Full-Stack & React Developer" to "Full Stack & AI Integration Engineer" to reflect production AI/RAG work.
