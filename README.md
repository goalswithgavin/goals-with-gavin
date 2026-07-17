# Gavin Reeder — Build Log Website

5 pages: `index.html` (Home), `about.html`, `resources.html`, `products.html`, `subscribe.html`.

Each page is self-contained — its CSS lives in a `<style>` block near the top and its JS in a `<script>` block near the bottom of that same file. This was done so the site previews correctly everywhere (including sandboxed previews) without depending on loading separate files.

## How to edit things yourself

- **Text**: open any `.html` file in a text editor (VS Code, Notepad, TextEdit) and change the words between the tags.
- **Colors**: near the top of the `<style>` block in each file, under `:root`, the same color variables (`--amber`, `--ink`, etc.) are defined. **Because each page is self-contained, if you want to change a color site-wide, you need to change it in the `:root` block of all five files** — copy your edit from one file's `:root` block into the others.
- **Fonts**: also inside `:root`, under `--display`, `--body`, `--mono`.
- **Nav links / social links**: the header and footer repeat at the top and bottom of every page — update the `<nav>` and `<ul class="social-row">` blocks the same way in all five files if you add a page or social link.
- **New sections**: copy an existing `<section>...</section>` block and edit its contents — the CSS classes (`.card`, `.panel`, `.grid-3`, `.hero`, etc.) will style it automatically.

## Updating your live numbers (stats.json)

The homepage stat strip, the two goal progress bars, and the "sold so far" count on the Products page are all driven by one file: **`stats.json`**. Edit the numbers in that one file and every page updates — no HTML editing needed.

```json
{
  "launchDate": "2026-07-02",
  "videosPosted": 20,
  "emailSubscribers": 0,
  "pdfsSold": 0,
  "product2Status": "Idea stage"
}
```

- `launchDate` — set this to the actual date you started building. "Days building in public" is calculated from this automatically every day — you never have to touch it again once it's correct.
- `videosPosted` — update by hand whenever you post a new one.
- `emailSubscribers` — check your Formspree dashboard and update this number. This is a placeholder right now — **update it to your real current count before this goes live**, since the site's whole thing is "no fake numbers."
- `pdfsSold` — check your Payhip sales dashboard and update this number. The "$ earned" goal bar is calculated automatically from this (`pdfsSold × $19`), so you only ever edit the one number.
- `product2Status` — a short status like `"Idea stage"`, `"In progress"`, or `"Coming soon"`.

**Important — this is NOT fully automatic (yet).** Nothing currently pings your Formspree or Payhip account in real time — you have to check those dashboards and update the numbers in `stats.json` yourself when they change. True zero-touch automation (the number updating itself the instant someone subscribes or buys) needs a small backend service holding your Formspree/Payhip API keys — that's a bigger, more technical project. If you want to go that route later, it's doable for free using a Vercel serverless function, and I can help you set it up.

For now, checking your dashboards and editing this one file (weekly, or whenever you remember) is what most solo creators actually do — it's quick and it keeps every number on your site honest.

## Photos

Your photos are already in place:
- `img/gavin-hero.jpg` — homepage, front and center
- `img/gavin-nav.jpg` — small circular logo in the nav bar (links to the About page)
- `img/gavin-about.jpg` — About page

To swap any of them for a different photo later, just replace the file with a new image saved under the same filename (or update the `src` in the matching `.html` file if you rename it).

## Selling the $19 product

The "Buy now" button on `products.html` links to `#` — it doesn't charge anyone yet. Pick one:

1. **Gumroad** (easiest): upload your prompts PDF, set price to $19, paste the checkout link Gumroad gives you into the button's `href`.
2. **Payhip**: same idea as Gumroad — free to start, handles delivery + payment.
3. **Stripe Payment Links**: create a $19 Payment Link in your Stripe dashboard, no code needed, swap the URL in.

## Making the email signup actually work

Right now `subscribe.html` just shows a "you're on the list" message — it doesn't save anyone's email. Pick one:

1. **Formspree** (easiest, free): sign up at formspree.io, create a form, and set `<form id="signup-form" class="stack" action="YOUR_FORMSPREE_URL" method="POST">` in `subscribe.html`.
2. **ConvertKit / beehiiv**: built for creators sending regular updates — paste their embed form in place of the demo one.
3. **Mailchimp**: free tier, grab the embedded signup form code from your audience settings and swap it in.

## Putting this online

Any of these will host it for free:
- **Netlify** or **Vercel**: drag the whole folder onto their dashboard.
- **GitHub Pages**: push the folder to a GitHub repo and enable Pages in settings.

Once it's live, you'll get a URL to put in your TikTok/Instagram/YouTube bios.

