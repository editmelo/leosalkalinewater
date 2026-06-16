# Web Assets

- logo.png — primary wordmark
- urban-league-logo.png — Indiana Urban League partner logo
- hero.mp4 / hero-poster.jpg — homepage hero background (compressed from Leo_s 2026 Rough Edits)

## Still needed (placeholders in use until provided)

- Real product photography (jug, dispenser, starter package)
- MBE + WQA Gold Standard certification badge files
- Final dispenser/starter-package price

## Hero video compression (TODO — ffmpeg not installed at build time)

The raw source file (`Leo_s 2026 Rough Edits/Leo Hero Media.mp4`) is 1.3 GB and is
**gitignored** from the repo (`public/hero.mp4` is excluded from version control).

Once ffmpeg is installed, run the following to compress it for web and generate a poster:

```bash
ffmpeg -i "Leo_s 2026 Rough Edits/Leo Hero Media.mp4" \
  -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an \
  -movflags +faststart public/hero.mp4

ffmpeg -i public/hero.mp4 -ss 00:00:01 -vframes 1 public/hero-poster.jpg
```

The placeholder `hero-poster.jpg` currently in the repo is a 1×1 pixel fallback.
Replace it with the real frame extracted above before launch.
