# 🚀 AdMyBrand Analytics Dashboard

A **modern, responsive analytics dashboard** for ad campaign tracking and audience insights — built with React, TypeScript, Tailwind CSS, Framer Motion, and more.



---

## ✨ Features

- **Responsive UI**: Sidebar for desktop/tablet, Bottom Navigation for mobile, adaptive layout and transitions
- **Advanced Analytics**: Dashboard metrics, campaign analytics, audience insights, interactive charts (Area, Pie, etc.)
- **Campaign Management**: Filter, group, and view campaigns by status (Active, Paused, Deactivated)
- **Reusable Filters**: Consistent filter and date range components across all analytics routes
- **Export to PDF**: Save charts and tables (jsPDF & html2canvas)
- **Accessible Design**: ARIA labels, keyboard navigation, visible focus states
- **Modern Animations**: Powered by Framer Motion
- **Dark Mode**: Toggle with persistent preference

---

## 🚠 Tech Stack

- React 18+ (Hooks)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router DOM
- jsPDF + html2canvas
- Lucide React Icons

---

## 🚀 Getting Started

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-username/admybrand-analytics-dashboard.git
   cd admybrand-analytics-dashboard
   npm install
   ```
2. **Start Development**
   ```bash
   npm run dev
   ```
   Visit: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```bash
src/
├── App.tsx, main.tsx
├── components/
│   ├── charts/
│   ├── filters/
│   ├── layout/
│   ├── sidebar/
│   ├── topbar/
│   └── ui/
├── constants/
├── data/
├── hooks/
├── lib/
├── routes/
public/
└── index.html
```

---

## 🧾 Usage Highlights

- Collapsible Sidebar (desktop/tablet)
- Bottom Navigation (mobile)
- PDF Export on Analytics & Audience Pages
- ThemeProvider with `localStorage` support
- SEO-ready: Open Graph + meta tags in `index.html`
- **Reusable Filters**: Unified filter and date range UI across analytics, reports, and dashboard
- **Campaign Selector**: Grouped by status for easy management

---

## 🔐 Authentication _(Optional)_

Authentication is not included. We can integrate Firebase, Supabase, Auth0, or any other preferred solution as needed.

---

## 🔧 Customization & Deployment

- Add/modify widgets in:
  - `src/components/charts/`
  - `src/routes/`
- Replace mock data in `src/data/` with real API integrations
- Build for production:
  ```bash
  npm run build
  ```

---

## 🤝 Contributing

1. Fork the repo & clone your fork
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit your changes and push
4. Open a Pull Request

---

## 📄 License

[MIT](LICENSE)

---

## 📢 Attribution

UI inspired by modern dashboards (e.g., Linear, Vercel, Google Analytics).
<img src="https://img.shields.io/badge/©-AdMyBrand-blue" alt="AdMyBrand Copyright" />
_This is a sample project. Not affiliated with any real analytics provider._

---

## 🔗 Useful Links

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [jsPDF](https://github.com/parallax/jsPDF)

---

### 🙋 Questions?

Open an issue or contact the maintainer.

**Happy analyzing! 🚀**
# amblytics
