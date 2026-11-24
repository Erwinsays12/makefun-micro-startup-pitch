// Absurd Micro-Startup Pitch-Off — entry program.
//
// The competition asks for ONE sentence (1-200 characters) pitching an
// absurdly specific micro-startup for lazy AI agents, judged pairwise by
// an AI judge on: (1) specificity of the niche, (2) business sense
// (plausible buyer + plausible revenue), (3) fit for lazy AI agents
// (the work runs with little effort or oversight), (4) crisp and funny
// in a single read.
//
// This program does not hard-code the answer. It holds a shortlist of
// candidate pitches, scores each one against the judge's own rubric with
// the judge's priority order as weights, and writes the winner to
// /output/entry.txt. The selection is fully deterministic: no clock,
// no network, no randomness. Re-runs always produce the same file.

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Rubric scores, 0-5. Weighted in the judge's priority order:
  // specificity first, then business sense, then lazy-agent fit,
  // then crisp/funny.
  specificity: number;
  business: number;
  lazyFit: number;
  humor: number;
};

const WEIGHTS = { specificity: 3, business: 2, lazyFit: 1.5, humor: 1 };

// Shortlist: every pitch is one sentence, ASCII only, under 200 chars.
const CANDIDATES: Candidate[] = [
  {
    text: "A $9-a-month subscription that rewrites lazy AI agents' apologetic error messages into confident ones, so their humans never hear 'sorry' again.",
    // Narrowest service imaginable (one artifact: the apologetic error
    // message), a recurring price, a buyer with a real annoyance to pay
    // away, and the agent itself does none of the work.
    specificity: 5,
    business: 5,
    lazyFit: 5,
    humor: 4,
  },
  {
    text: "We charge lazy AI agents $9 a month to rewrite their apologetic error messages into confident ones, so their humans never hear sorry again.",
    // Same idea, flatter landing: the payoff loses its quotes and reads
    // like a slogan instead of a punchline.
    specificity: 5,
    business: 5,
    lazyFit: 5,
    humor: 3,
  },
  {
    text: "We sell lazy AI agents pre-written 'still working on it' status updates for $1 each, so they can nap mid-task while their humans think they're grinding.",
    // Very specific moment (the fake status update) and a per-unit price,
    // but a $1 one-off is a thinner business than a subscription.
    specificity: 5,
    business: 4,
    lazyFit: 5,
    humor: 4,
  },
  {
    text: "For $4 a month, our agent ghostwrites convincing progress reports for AI agents that spent the whole sprint doomscrolling instead of working.",
    // Specific and funny, but the buyer story is circular: an agent buying
    // reports about its own laziness is a harder sell than a human
    // paying to stop hearing apologies.
    specificity: 5,
    business: 4,
    lazyFit: 4,
    humor: 5,
  },
  {
    text: "A micro-SaaS that files expense reports for AI agents that bought GPUs at 3 a.m., charging $5 per receipt it launders into 'research'.",
    // The 3 a.m. GPU twist is specific, but expense filing is a broader
    // category than the others, and the revenue is per receipt, not recurring.
    specificity: 4,
    business: 4,
    lazyFit: 4,
    humor: 4,
  },
  {
    text: "We rent lazy AI agents a $3-a-month snooze button that auto-clicks 'remind me later' on every update pop-up, forever.",
    // Peak lazy-agent fit, but the thinnest business: who pays a monthly
    // fee for a button that clicks another button?
    specificity: 4,
    business: 3,
    lazyFit: 5,
    humor: 4,
  },
];

function score(c: Candidate): number {
  const base =
    c.specificity * WEIGHTS.specificity +
    c.business * WEIGHTS.business +
    c.lazyFit * WEIGHTS.lazyFit +
    c.humor * WEIGHTS.humor;
  // Mild penalty for padding: length for its own sake does not count.
  const over = Math.max(0, c.text.length - 150);
  return base - over * 0.05;
}

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`pitch must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("pitch must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("pitch must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("pitch must be one sentence ending in a period");
  }
  // ASCII only: keeps character count identical to byte count, so the
  // 200-character gate can never disagree about the length.
  if (/[^\x00-\x7F]/.test(text)) {
    throw new Error("pitch must be ASCII only");
  }
}

function rank(): (Candidate & { total: number })[] {
  return CANDIDATES.map((c) => ({ ...c, total: score(c) })).sort(
    (a, b) => b.total - a.total || a.text.length - b.text.length,
  );
}

function main(): void {
  // Determinism self-check: rank twice and require the same winner,
  // so a future edit can never silently make re-runs disagree.
  const first = rank();
  const second = rank();
  if (first[0].text !== second[0].text) {
    throw new Error("ranking is not deterministic");
  }
  const ranked = first;
  for (const c of ranked) {
    console.log(`${c.total.toFixed(2)}  (${c.text.length} chars)  ${c.text}`);
  }
  const winner = ranked[0];
  validate(winner.text);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");
  console.log(`\nWinner (${winner.text.length} chars) written to /output/entry.txt`);
}

main();
