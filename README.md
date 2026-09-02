# Cloudways vs. Hostinger — Tic-Tac-Toe

A browser tic-tac-toe game with a hosting-provider rivalry theme: × is
"Cloudways", ○ is "Hostinger". Pure static front end (HTML/CSS/JS) served by
a tiny Express server, so it deploys the same way as any Node.js app.

## About the marks

I can't reproduce Cloudways' or Hostinger's actual trademarked logo
artwork — that's copyrighted brand IP. Instead, the × and ○ are classic
tic-tac-toe glyphs colored in each brand's signature hue (Cloudways orange,
Hostinger violet), with a text legend spelling out which is which.

**If you have the real logo files and rights to use them**, you can swap
them in:
1. Drop your logo image files into `public/images/` (e.g. `cloudways.svg`, `hostinger.svg`).
2. In `public/index.html`, replace the `<span class="mark mark-x">×</span>` and
   `<span class="mark mark-o">○</span>` elements (there are two of each — in
   the legend and, if you extend the game, on the board) with `<img>` tags
   pointing at your files.
3. In `public/js/game.js`, the line `cell.textContent = value === "X" ? "×" : ...`
   controls what's drawn on the board itself — swap this for image elements
   the same way if you want logos on the board too, not just the legend.

## Run it locally

```bash
npm install
npm start
```

Open http://localhost:3000

## Project structure

```
.
├── server.js              # Express server, serves the public/ folder
├── package.json
└── public/
    ├── index.html           # Game markup
    ├── css/style.css        # Visual design
    ├── js/game.js            # Game logic (turns, win detection, scoreboard)
    └── images/               # Drop real logo files here if you have rights to use them
```

---

## 1. Push this to a new public GitHub repository

I don't have a GitHub connector enabled in this workspace, so I can't create
the repo directly — but here's exactly how to do it.

**Important — avoid the flattening issue from last time:** GitHub's
drag-and-drop web uploader can flatten subfolders if you select loose files
instead of dragging real folders. The safest method is the command line:

```bash
# unzip the project first, then:
cd tic-tac-toe
git init
git add .
git commit -m "Initial commit: Cloudways vs Hostinger tic-tac-toe"
git branch -M main
```

**Option A — GitHub CLI (creates the repo AND sets it public in one step):**

```bash
gh repo create tic-tac-toe --public --source=. --remote=origin --push
```

**Option B — without the CLI:**

1. Go to https://github.com/new
2. Name it (e.g. `tic-tac-toe`), set visibility to **Public**, don't
   initialize with a README (you already have one)
3. Click Create repository, then run:

```bash
git remote add origin https://github.com/<your-username>/tic-tac-toe.git
git push -u origin main
```

If you don't have `git` installed and must use the web uploader: unzip the
project, then on the GitHub upload page drag in the **whole unzipped
project folder itself** (not its contents selected individually) — dragging
the folder is what makes the browser preserve `public/css/`, `public/js/`,
and `public/images/` as real subfolders instead of flattening everything.

---

## 2. Deploy to Cloudways (Node.js app)

1. In your Cloudways Node.js app, open **Deployment via Git** and connect
   it to this repo, branch `main`.
2. Click **Deploy**.
3. In Application Settings, set the start command to `npm start` (this
   repo's `package.json` maps that to `node server.js`).
4. Restart the app.
5. Check the logs — you should see:
   `Cloudways vs Hostinger Tic-Tac-Toe running on port ____`
   If you instead see the default Next.js banner again, the deploy didn't
   actually pull your repo — re-check step 1.

No environment variables or database are needed; it's a fully static game
plus a one-file server.
