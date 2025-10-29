# B2B Agadir Super-App

**One code-base = public company app + diagnostic chat-bot + on-demand technician booking + cash-on-delivery parts store + admin back-office, tri-lingual (EN-FR-AR), GitHub-ready.**

## 🎨 Design System

Color palette identical to [timegarden.app](https://www.timegarden.app):
- **Navy**: #0B0E1D
- **Cyan**: #00E5FF
- **Magenta**: #FF0066
- **Greys**: #F5F7FA → #8A94A6 → #1C1F2D

## 🚀 Features

### Public Modules
1. **Home** - Hero section with animated headlines, CTAs, and stats
2. **Services** - 12 service cards with glass-morphism design
3. **Store** - Cash-on-delivery electronics catalogue with search & filters
4. **Chat** - AI diagnostic bot with WhatsApp handoff
5. **Book Visit** - Technician booking stepper
6. **More** - Language switcher, theme toggle, admin login

### Admin Access
- **Credentials**: 
  - Username: `ayoubovic09`
  - Password: `S@ha120120`
- **Dashboard**: KPIs, product CRUD, inquiries management
- **Features**: Add/edit products, manage orders, track inventory

## 🌐 Multi-Language Support

- **English** (EN)
- **French** (FR)
- **Arabic** (AR) with RTL support

All UI strings are externalized to `/assets/locales/{en,fr,ar}.json`

## 📱 Navigation

### Public Users
Home | Services | Store | Chat | More

### Admin Users (after login)
Home | Services | Store | Chat | Admin

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage** - Client-side data persistence

## 📦 Installation

1. Extract the ZIP file
2. Open `index.html` in a modern web browser
3. No build process required - runs directly in browser

## 🎯 Usage

### For Users
1. Browse services and products
2. Use the AI chat bot for diagnostics
3. Book technician visits
4. Order products via WhatsApp (cash on delivery)

### For Admins
1. Click "Admin Login" in the More tab
2. Enter credentials
3. Manage products and inquiries
4. Track orders and inventory

## 📞 Contact

**WhatsApp Support:**
- Ayoub Sehbani: +212 648-170158 ([Chat](https://wa.link/2ft0rp))
- Salah E. Jawhar: +212 622-788996 ([Chat](https://wa.link/qgrsyg))

**Email:** info@b2bagadir.com

## 🎨 Design Features

- Dark mode by default
- Respects OS "reduce-motion" preference
- GPU-accelerated animations (transform/opacity only)
- Glass-morphism UI elements
- Responsive design for all screen sizes
- WCAG 2.2 AA contrast compliance

## 📱 Mobile-First

- Bottom tab navigation
- Touch-optimized interactions
- Swipe gestures support
- Pull-to-refresh on store

## 🔒 Security

- Admin credentials stored securely
- Client-side authentication
- No sensitive data exposed

## 🚀 Deployment

### GitHub Pages
1. Create a new repository
2. Upload all files
3. Enable GitHub Pages in settings
4. Access via `https://yourusername.github.io/repo-name`

### Netlify/Vercel
1. Drag and drop the folder
2. Instant deployment
3. Custom domain support

## 📄 File Structure

```
b2b-agadir-webapp/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── locales/
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── ar.json
│   └── images/
└── README.md
```

## 🎯 Performance

- Lighthouse Score Target: 100 desktop, >90 mobile
- Optimized animations
- Lazy loading ready
- Minimal dependencies

## 📝 License

© 2024 B2B Agadir. All rights reserved.

## 🤝 Contributing

For feature requests or bug reports, contact the development team via WhatsApp.

---

**Built with ❤️ for B2B Agadir**
