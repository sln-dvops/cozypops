# CozyPops Static Frontend

A fully static CozyPops catalogue website designed for free hosting on Netlify.

## What is included
- Home page with animated hero, new/trending section, categories, restock CTA, reviews
- Shop page with search, category filters, New/Viral/In Stock/Low Stock/Preorder/Sold Out filters, sorting
- 20 placeholder products
- 3 local placeholder images for every product (60 SVG images total)
- Product detail gallery with thumbnails
- Product reviews UI (demo reviews persist in the current browser using localStorage)
- About, Delivery, Squishy Care and Contact pages
- Responsive mobile navigation and active nav highlighting
- Telegram + TikTok calls to action
- No checkout, payment or backend

## IMPORTANT: edit Telegram link
Open `js/app.js` and change:

```js
telegramUrl: 'https://t.me/YOUR_USERNAME'
```

## Edit products
All products are in:

`js/products.js`

Each product has name, price, qty, category, badges and 3 image paths. You can replace the placeholder image files in `assets/products/` or update each image path.

### Stock logic
- quantity 0 = Sold Out
- quantity 1–3 = Low Stock
- quantity 4+ = In Stock
- The **In Stock** filter intentionally includes low-stock items (anything with qty > 0).

## Reviews
The review UI is frontend-only. New reviews are stored in the visitor's browser with `localStorage`; they are not shared with other users. A real shared review system requires a backend/database or CMS.

## Deploy to Netlify
1. Unzip the folder.
2. Drag the entire `cozypops-static-site` folder into Netlify's manual deploy area, OR connect the folder/repository through Git.
3. No build command is needed. Publish directory is the project root.

## Static-site limitation
Because this version is intentionally frontend-only, there is no real admin panel that can permanently update products for every visitor. Edit `js/products.js` and redeploy when stock/details change. If you later want a free/low-cost admin workflow, a Git-based CMS such as Decap CMS can be added.
