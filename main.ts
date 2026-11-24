// Absurd Micro-Startup Pitch-Off (Node 22, standard library only): writes a
// single line of text — the pitch for InvoiceHound, a lazy agent that nags
// late-paying clients with escalating politeness — to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'InvoiceHound: a lazy agent that nags your late-paying clients with escalating politeness — friendly on day 7, firm on day 30, guilt-tripping on day 60 — and takes 5% of whatever it recovers.';

// The sealed scorer only accepts 1–200 UTF-8 characters, not only whitespace:
// fail loudly here instead of writing an entry the judge would never see.
if (LINE.length < 1 || LINE.length > 199 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-199 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
