# Gavin Reeder — Build Log Website

5 pages: `index.html` (Home), `about.html`, `resources.html`, `products.html`, `subscribe.html`.

Each page is self-contained — its CSS lives in a `<style>` block near the top and its JS in a `<script>` block near the bottom of that same file. This was done so the site previews correctly everywhere (including sandboxed previews) without depending on loading separate files.

## How to edit things yourself

- **Text**: open any `.html` file in a text editor (VS Code, Notepad, TextEdit) and change the words between the tags.
- **Colors**: near the top of the `<style>` block in each file, under `:root`, the same color variables (`--amber`, `--ink`, etc.) are defined. **Because each page is self-contained, if you want to change a color site-wide, you need to change it in the `:root` block of all five files** — copy your edit from one file's `:root` block into the others.
- **Fonts**: also inside `:root`, under `--display`, `--body`, `--mono`.
- **Nav links / social links**: the header and footer repeat at the top and bottom of every page — update the `<nav>` and `<ul class="social-row">` blocks the same way in all five files if you add a page or social link.
- **New sections**: copy an existing `<section>...</section>` block and edit its contents — the CSS classes (`.card`, `.panel`, `.grid-3`, `.hero`, etc.) will style it automatically.

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

