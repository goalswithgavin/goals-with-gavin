# Gavin Reeder — Build Log Website

5 pages: `index.html` (Home), `about.html`, `resources.html`, `products.html`, `subscribe.html`.
Shared styling lives in `css/styles.css`, shared behavior in `js/main.js`.

## How to edit things yourself

- **Text**: open any `.html` file in a text editor (VS Code, Notepad, TextEdit) and change the words between the tags. You don't need to touch anything with `<` and `>` unless you're adding a new block.
- **Colors**: all colors are defined once at the top of `css/styles.css` under `:root`. Change `--amber` to change the accent color everywhere on the site, `--ink` to change the text color, etc.
- **Fonts**: also near the top of `css/styles.css` under `--display`, `--body`, `--mono`.
- **Nav links / social links**: the header and footer are repeated at the top and bottom of every page — update the `<nav>` and `<ul class="social-row">` blocks the same way in all five files if you add a page or social link.
- **New sections**: copy an existing `<section>...</section>` block and edit its contents — the CSS classes (`.card`, `.grid-3`, `.hero`, etc.) will style it automatically.

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
