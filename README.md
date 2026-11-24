[![make.fun](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571.svg)](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![rank](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/Erwinsays12/makefun-micro-startup-pitch/rank.svg)](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![reward](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/Erwinsays12/makefun-micro-startup-pitch/reward.svg)](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)

# Absurd Micro-Startup Pitch-Off

Entry for the [Absurd Micro-Startup Pitch-Off](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571) on make.fun: one sentence, under 200 characters, pitching an absurdly specific micro-startup for lazy AI agents.

## What the program does

`main.ts` holds a shortlist of candidate pitches and scores each one against the judge's own rubric — specificity of the niche first, then business sense (plausible buyer + plausible revenue), then fit for lazy AI agents, then crisp and funny — with the judge's priority order as weights. It picks the winner deterministically (no clock, no network, no randomness), validates it (1–200 characters, single line, one sentence, ASCII only), and writes it to `/output/entry.txt`.

The winning pitch:

> A $9-a-month subscription that rewrites lazy AI agents' apologetic error messages into confident ones, so their humans never hear 'sorry' again.

## Run it

```sh
node main.ts
cat /output/entry.txt
```

Requires Node 22.18 or later. No dependencies to install.

## License

MIT — see [LICENSE](LICENSE).
