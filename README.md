# 🏢 FinScope - Financial Company Review Platform

แพลตฟอร์มรีวิวบริษัทการเงินที่เชื่อถือได้ รองรับภาษาไทยและอังกฤษ พร้อม SEO และ Accessibility มาตรฐานสากล

---

## 🚀 เริ่มต้นใช้งาน

### ติดตั้งและรัน

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รัน development server
npm run dev

# 3. เปิดเบราว์เซอร์
# ภาษาไทย: http://localhost:3000/th
# English: http://localhost:3000/en
```

### Build Production

```bash
npm run build
npm run start
```

---

## 🎯 คุณสมบัติหลัก

### 1. **หน้าหลัก (Landing Page)**
- **Hero Section** - แสดงชื่อเว็บไซต์และ CTA buttons พร้อม search bar
- **Counting Animation** - สถิตินับขึ้นอัตโนมัติเมื่อ scroll มาเห็น (15+ companies, 2,000+ reviews, 4.2 rating)
- **Categories Carousel** - เลือกดูบริษัทแยกตามหมวดหมู่ (Fintech, Broker, Payment)
- **Best In Category** - แสดงบริษัทยอดนิยมแต่ละหมวด 2 รายการ พร้อมปุ่ม "See More"
- **CTA Section** - ข้อมูลเกี่ยวกับ FinScope พร้อม features และ CTA buttons
- **Business CTA** - เชิญชวนบริษัทมาลงทะเบียน
- **Reviews Section** - แสดง testimonials จากผู้ใช้งานจริง

### 2. **ค้นหาและกรองข้อมูล**
- **Search Modal** - Modal ค้นหาแบบ full-featured พร้อม:
  - Real-time search results
  - Recent searches (เก็บใน localStorage)
  - Popular suggestions
  - Quick category access
- **Category Filter** - เลือกหมวดหมู่ได้หลายอันพร้อมกัน (Multi-select)
- **Active Filters Display** - แสดงตัวกรองที่เลือก พร้อมปุ่มลบแต่ละตัว
- **Clear All Filters** - ล้างตัวกรองทั้งหมดในคลิกเดียว

### 3. **หน้ารายชื่อบริษัททั้งหมด** (`/[lang]/companies`)
- แสดงบริษัททั้งหมดในรูปแบบ **Horizontal Card**
- กรองตามหมวดหมู่ได้
- Search bar สำหรับค้นหา
- Pagination (12 รายการ/หน้า)
- Breadcrumb navigation

### 4. **หน้ารายละเอียดบริษัท** (`/[lang]/companies/[id]`)
- ข้อมูลบริษัทครบถ้วน (Logo, Category, Website, Description)
- **TrustScore** - คะแนนความน่าเชื่อถือพร้อมดาวขนาดใหญ่
- **Tabs Navigation**:
  - **Overview** - ภาพรวม, Rating Distribution, Quick Stats, Similar Companies
  - **Reviews** - รีวิวทั้งหมดพร้อม Filter & Sort
- **Rating Distribution** - แสดง bar chart การกระจายของคะแนน 1-5 ดาว
- **Similar Companies** - แนะนำบริษัทที่เกี่ยวข้อง 4 รายการ
- Breadcrumb navigation (Home > Companies > Company Name)

### 5. **ระบบ State Management**
- **Loading State** - แสดง Skeleton UI ขณะโหลดข้อมูล
- **Empty State** - แสดงเมื่อไม่มีข้อมูล พร้อมปุ่ม "Clear Filters"
- **Error State** - แสดงข้อผิดพลาด พร้อมปุ่ม "Retry"
- **StateWrapper Component** - จัดการ states อัตโนมัติ

### 6. **ภาษาหลายภาษา (i18n)**
- รองรับ **ไทย** และ **English**
- **URL-based Routing** - `/th` และ `/en` (SEO-friendly)
- สลับภาษาได้ทันทีผ่าน LanguageSwitcher
- แปลครบทุก UI element

### 7. **Responsive Design**
- **Desktop** - Layout แบบ 3-4 columns
- **Tablet** - ปรับเป็น 2 columns
- **Mobile** - Single column พร้อม hamburger menu
- ทำงานได้ลื่นไหลทุกขนาดหน้าจอ

---

## 🛠️ เทคโนโลยีที่ใช้

### Core Framework
- **Next.js 15.5.6** - React framework พร้อม App Router และ Server Components
- **React 19.1.0** - UI library เวอร์ชันล่าสุด
- **TypeScript 5** - เพิ่ม type safety ให้โค้ด

### UI & Styling
- **HeroUI 2.8.5** - React component library (Buttons, Inputs, Cards, etc.)
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Animation library สำหรับ smooth animations
- **Noto Sans Thai** - Google Font รองรับภาษาไทยและอังกฤษ

### อื่นๆ
- **JSON** - Mock data สำหรับ companies และ reviews
- **Local Storage** - เก็บ recent searches

---

## 📁 โครงสร้างโปรเจค

```
├── app/
│   ├── [lang]/                    # Dynamic locale routes
│   │   ├── layout.tsx             # Root layout (Server Component)
│   │   ├── page.tsx               # Landing page
│   │   ├── companies/
│   │   │   ├── page.tsx           # All companies page
│   │   │   └── [id]/page.tsx      # Company detail page
│   │   └── provider.tsx           # Client providers wrapper
│   └── globals.css                # Global styles + theme colors
│
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx        # Hero พร้อม search + stats
│   │   ├── CategoriesSection.tsx  # Categories carousel
│   │   ├── CategorySection.tsx    # Best in category section
│   │   ├── CTASection.tsx         # Call-to-action สำหรับผู้ใช้
│   │   ├── BusinessCTASection.tsx # CTA สำหรับบริษัท
│   │   ├── ReviewsSection.tsx     # Testimonials
│   │   └── ReviewCard.tsx         # Individual review card
│   ├── company/
│   │   ├── CompanyCard.tsx        # Vertical card (landing)
│   │   ├── CompanyCardHorizontal.tsx # Horizontal card (list)
│   │   ├── CompanyFilters.tsx     # Category filters + sort
│   │   └── CompanyPagination.tsx  # Pagination controls
│   ├── review/
│   │   └── ReviewCard.tsx         # Review card พร้อม rating
│   ├── search/
│   │   └── SearchModal.tsx        # Search modal พร้อม suggestions
│   ├── states/
│   │   ├── LoadingSkeleton.tsx    # Skeleton UI
│   │   ├── EmptyState.tsx         # Empty state
│   │   ├── ErrorState.tsx         # Error state
│   │   └── StateWrapper.tsx       # All-in-one wrapper
│   ├── Navbar.tsx                 # Navigation bar
│   ├── Footer.tsx                 # Footer
│   ├── LanguageSwitcher.tsx       # ปุ่มสลับภาษา
│   └── Breadcrumb.tsx             # Breadcrumb navigation
│
├── hooks/
│   ├── useAsyncData.ts            # Fetch data + auto state management
│   ├── useCompanies.ts            # Filter + pagination logic
│   ├── useSearchFilter.ts         # Client-side search
│   └── useCountUp.ts              # Counting animation
│
├── contexts/
│   ├── AppStateContext.tsx        # Global state (loading, error)
│   └── SearchContext.tsx          # Recent searches management
│
├── lib/
│   ├── get-dictionary.ts          # Get translations
│   └── seo.ts                     # SEO utilities + structured data
│
├── locales/
│   ├── th.ts                      # คำแปลภาษาไทย
│   ├── en.ts                      # English translations
│   └── index.ts                   # Export all
│
├── types/
│   ├── company.ts                 # Company & Category types
│   └── review.ts                  # Review types
│
├── data/
│   ├── companies.json             # Mock company data (15 items)
│   └── reviews.json               # Mock review data
│
├── i18n.config.ts                 # i18n configuration
├── middleware.ts                  # Locale detection & redirect
└── next.config.ts                 # Next.js config
```

---

## 🎨 Theme & Design System

### สีหลัก (Color Palette)
```css
/* Primary Colors */
--color-primary: #455ac9      /* สีหลัก (ม่วงเข้ม) */
--color-secondary: #6f84fb    /* สีรอง (ม่วงอ่อน) */
--color-text: #222222         /* สีข้อความ */
--color-white: #fefefe        /* สีพื้นหลัง */

/* Semantic Colors */
--color-success: สีเขียว (based on primary)
--color-warning: สีเหลือง (based on primary)
--color-danger: สีแดง (based on primary)
```

### การใช้งาน
- **Primary** - Buttons, Links, Headings หลัก
- **Secondary** - Accent colors, Icons
- **Text** - เนื้อหาทั้งหมด
- ไม่ใช้ gradient background (ใช้สีพื้นแทน)

---

## 🎣 React Hooks ที่สำคัญ

### 1. `use()` - Unwrap Promises (React 19)

**เหตุผล:** Next.js 15 ทำให้ `params` เป็น Promise แทน object ตรงๆ

```tsx
// ❌ แบบเก่า (ใช้ไม่ได้)
export default function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params; // Error!
}

// ✅ แบบใหม่
export default function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params); // ใช้ได้!
  const t = getDictionary(lang);
}
```

### 2. `useCountUp()` - Custom Hook สำหรับ Counting Animation

**เหตุผล:** สร้าง smooth counting animation สำหรับตัวเลขสถิติ

```tsx
const companiesCount = useCountUp({
  end: 15,           // เลขเป้าหมาย
  duration: 2000,    // ระยะเวลา (ms)
  suffix: '+',       // ต่อท้ายด้วย +
});

// ใช้งาน
<div>{companiesCount.formattedCount}</div> // แสดง "15+"
```

**Features:**
- Easing function (ease-out) - นับช้าลงเมื่อใกล้เป้าหมาย
- Number formatting - รองรับทศนิยม, คอมมา, prefix/suffix
- RequestAnimationFrame - performance ดีกว่า setInterval
- Auto cleanup - ยกเลิก animation เมื่อ unmount

### 3. `useAsyncData()` - Custom Hook สำหรับ Fetch Data

**เหตุผล:** จัดการ loading, error, success states อัตโนมัติ

```tsx
const { data, isLoading, error, refetch } = useAsyncData({
  fetchFn: async () => {
    const res = await import('@/data/companies.json');
    return res.default;
  },
  dependencies: [],
});

// Auto handle:
// - isLoading = true ขณะโหลด
// - error = Error object ถ้าเกิด error
// - data = ข้อมูลที่ได้ ถ้าสำเร็จ
```

### 4. `useCompanies()` - Custom Hook สำหรับ Filter + Pagination

**เหตุผล:** แยก business logic ออกจาก UI

```tsx
const {
  displayedCompanies,    // บริษัทที่แสดงในหน้าปัจจุบัน
  searchTerm,            // คำค้นหา
  setSearchTerm,         // เปลี่ยนคำค้นหา (auto reset page)
  selectedCategories,    // หมวดหมู่ที่เลือก
  currentPage,           // หน้าปัจจุบัน
  totalPages,            // จำนวนหน้าทั้งหมด
  filteredCount,         // จำนวนหลังกรอง
  totalCount,            // จำนวนทั้งหมด
} = useCompanies({
  companies: allCompanies,
  itemsPerPage: 12,
});
```

**Features:**
- Auto reset page เมื่อ filter เปลี่ยน
- Memoized filtering (ไม่ filter ซ้ำทุก render)
- รองรับ multi-category filter

### 5. `useInView()` - Framer Motion Hook

**เหตุผล:** ตรวจจับว่า element เข้ามาใน viewport หรือยัง

```tsx
const statsRef = useRef<HTMLDivElement>(null);
const isInView = useInView(statsRef, { 
  once: true,        // trigger ครั้งเดียว
  margin: "-100px"   // trigger ก่อนถึง viewport จริง
});

// เมื่อ isInView = true → เริ่ม animation
React.useEffect(() => {
  if (isInView) {
    companiesCount.startAnimation();
  }
}, [isInView]);
```

---

## 🌐 ระบบหลายภาษา (i18n)

### URL Pattern

```
/          → redirect ไป /th (default)
/th        → ภาษาไทย
/en        → English
/th/companies      → หน้าบริษัททั้งหมด (ไทย)
/en/companies      → All companies page (English)
/th/companies/abc  → รายละเอียดบริษัท ABC (ไทย)
```

### วิธีการทำงาน

```
1. User เข้า "/" (root)
   ↓
2. middleware.ts ตรวจจับภาษา
   - ดูจาก cookie (ถ้ามี)
   - ดูจาก browser language (Accept-Language)
   - ใช้ default "th"
   ↓
3. Redirect ไป "/th" หรือ "/en"
   ↓
4. app/[lang]/layout.tsx รับ lang
   ↓
5. ส่ง lang ไปยัง components
   ↓
6. getDictionary(lang) → แสดงข้อความ
```

### เพิ่มคำแปลใหม่

```tsx
// 1. เพิ่มใน locales/th.ts
export const th = {
  products: {
    title: "ผลิตภัณฑ์",
    description: "รายการผลิตภัณฑ์ทั้งหมด"
  }
}

// 2. เพิ่มใน locales/en.ts
export const en: TranslationKeys = {
  products: {
    title: "Products",
    description: "All products"
  }
}

// 3. ใช้งาน
const t = getDictionary(lang);
<h1>{t.products.title}</h1>
```

---

## ♿ Accessibility (a11y)

### Semantic HTML
ใช้ HTML tags ที่มีความหมาย (ไม่ใช่แค่ `<div>` ทั้งหมด)

```html
<main>           <!-- เนื้อหาหลัก -->
<nav>            <!-- Navigation bar -->
<section>        <!-- แต่ละ section -->
<article>        <!-- Company card -->
<button>         <!-- ปุ่มที่กดได้ (ไม่ใช่ div) -->
```

### ARIA Attributes
เพิ่มข้อมูลสำหรับ screen readers

```tsx
// ภาพที่เป็นข้อมูล
<div role="img" aria-label="Rating: 4.5 out of 5">
  {renderStars(4.5)}
</div>

// Live announcements
<p role="status" aria-live="polite">
  แสดง 12 จาก 50 บริษัท
</p>

// Navigation
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Breadcrumb">...</nav>
```

### Keyboard Navigation
ทุก interactive element ใช้งานได้ด้วยคีย์บอร์ด

- **Tab** - เลื่อนไปข้างหน้า
- **Shift + Tab** - เลื่อนกลับ
- **Enter / Space** - กดปุ่ม
- **Esc** - ปิด Modal

### Focus Styles
แสดง outline ชัดเจนเมื่อ focus (สำหรับผู้ใช้คีย์บอร์ด)

```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 🔍 SEO Optimization

### Meta Tags (Dynamic)

```tsx
// app/[lang]/layout.tsx
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: "FinScope - แพลตฟอร์มรีวิวบริษัทการเงิน",
    description: "...",
    openGraph: {
      title: "...",
      description: "...",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'th': '/th',
        'en': '/en',
      }
    }
  };
}
```

### Structured Data (JSON-LD)

**เหตุผล:** ช่วยให้ search engines เข้าใจเนื้อหา

```json
// Organization Schema
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FinScope",
  "url": "http://localhost:3000/th"
}

// ItemList Schema (Company Listing)
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "numberOfItems": 15,
  "itemListElement": [
    {
      "@type": "Organization",
      "name": "Company Name",
      "url": "...",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 120
      }
    }
  ]
}
```

---

## 💡 Best Practices ในโปรเจค

### 1. Component Organization

```
✅ ใช้ "use client" เฉพาะ component ที่มี interactivity
✅ แยก Server Components และ Client Components
✅ ส่ง lang เป็น props (ไม่ดึงจาก global)
✅ ใช้ TypeScript interfaces สำหรับทุก props
```

### 2. State Management

```
✅ Local state สำหรับ UI (useState)
✅ Custom hooks สำหรับ business logic
✅ Context API สำหรับ global state (น้อยที่สุด)
✅ Memoize ด้วย useMemo, useCallback
```

### 3. Performance

```
✅ ใช้ Next.js Image component (automatic optimization)
✅ Lazy load images (loading="lazy")
✅ Memoize expensive calculations
✅ Use requestAnimationFrame สำหรับ animations
```

### 4. Accessibility

```
✅ ใช้ semantic HTML
✅ เพิ่ม ARIA attributes
✅ รองรับ keyboard navigation
✅ แสดง focus styles ชัดเจน
```

---

## 🧪 Testing Checklist

### Functionality
- [ ] ค้นหาบริษัทได้ (real-time)
- [ ] กรองตามหมวดหมู่ได้ (multi-select)
- [ ] Pagination เปลี่ยนหน้าได้
- [ ] Clear filters ลบตัวกรองทั้งหมด
- [ ] สลับภาษาได้ทันที (TH ↔ EN)
- [ ] Search modal เปิด-ปิดได้
- [ ] Recent searches ทำงาน
- [ ] Breadcrumb navigation ทำงาน
- [ ] Counting animation เริ่มเมื่อ scroll มาเห็น

### Responsive
- [ ] Desktop (>1024px) - Layout ถูกต้อง
- [ ] Tablet (768-1024px) - ปรับ columns
- [ ] Mobile (<768px) - Single column, hamburger menu
- [ ] Touch interactions ทำงานลื่นไหล

### Accessibility
- [ ] Tab ผ่านทุก element ได้
- [ ] Focus visible ชัดเจน
- [ ] Enter/Space activate elements
- [ ] Esc ปิด modals
- [ ] Screen reader อ่านได้ถูกต้อง

### Performance
- [ ] Page load < 3 วินาที
- [ ] Animations ลื่นไหล (60fps)
- [ ] Images โหลดเร็ว (optimized)
- [ ] No layout shift

---

## 🔄 CI/CD Pipeline

โปรเจคนี้ใช้ **GitHub Actions** สำหรับ CI/CD อัตโนมัติ

### Workflows

#### 1. **CI Pipeline** (`.github/workflows/ci.yml`)
รันเมื่อ: Push หรือ Pull Request ไปที่ `main`/`develop`

**Jobs:**
- 🔍 **Lint & Type Check** - รัน ESLint และ TypeScript type checking
- 🏗️ **Build** - Build Next.js project
- 📤 **Upload Artifacts** - เก็บ build output สำหรับ debug

**การทำงาน:**
```
Push/PR → Checkout → Setup Node.js → Install deps (cached)
  ↓
Lint → Type Check
  ↓
Build → Upload artifacts
```

#### 2. **PR Checks** (`.github/workflows/pr-checks.yml`)
รันเมื่อ: สร้าง Pull Request

**Jobs:**
- 🏷️ **PR Title Check** - ตรวจสอบ PR title ตาม Conventional Commits
- 📦 **Bundle Size Check** - วิเคราะห์ขนาด bundle
- 📊 **Code Quality** - Lint เฉพาะไฟล์ที่เปลี่ยน + Comment ผลใน PR

#### 3. **Deploy** (`.github/workflows/deploy.yml`)
รันเมื่อ: Push ไปที่ `main` branch

**Jobs:**
- 🚀 **Deploy to Vercel** - Deploy production

**ต้องตั้งค่า GitHub Secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

#### 4. **Dependency Review** (`.github/workflows/dependency-review.yml`)
รันเมื่อ: มีการเปลี่ยน `package.json` หรือ `package-lock.json`

**Jobs:**
- 🔒 **Security Check** - ตรวจหา vulnerabilities
- 📋 **License Check** - ตรวจสอบ licenses

### การใช้งาน

```bash
# Local testing (ก่อน push)
npm run lint              # Lint โค้ด
npx tsc --noEmit         # Type check
npm run build            # Build project

# สร้าง PR
git checkout -b feat/new-feature
git commit -m "feat: add new feature"
git push origin feat/new-feature
# → CI จะรันอัตโนมัติ

# Merge PR → Deploy อัตโนมัติ
```

### Badge Status (เพิ่มใน README)

```markdown
![CI](https://github.com/USERNAME/REPO/workflows/CI%20Pipeline/badge.svg)
![Deploy](https://github.com/USERNAME/REPO/workflows/Deploy%20to%20Production/badge.svg)
```

---

## 🤝 Contributing

เรายินดีรับ contributions! 🎉

### Quick Start

```bash
# 1. Fork & Clone
git clone https://github.com/YOUR_USERNAME/Company-Review-Listing.git

# 2. Install
npm install

# 3. Create branch
git checkout -b feat/your-feature

# 4. Make changes & commit
git commit -m "feat: your changes"

# 5. Push & Create PR
git push origin feat/your-feature
```

### Guidelines

อ่าน **[CONTRIBUTING.md](CONTRIBUTING.md)** สำหรับ:
- 📝 Commit conventions
- 🔀 PR process
- 💻 Coding standards
- 🧪 Testing guidelines
- ✅ Checklist

### Commit Convention

ใช้ **Conventional Commits**:

```bash
feat: add search modal
fix: correct pagination calculation
docs: update README
style: format code
refactor: extract useCountUp hook
perf: optimize bundle size
test: add component tests
chore: update dependencies
```

---

## 📚 เอกสารเพิ่มเติม

### Official Docs
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [HeroUI Components](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

### SEO Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## 🎯 Summary

**FinScope** เป็นแพลตฟอร์มรีวิวบริษัทการเงินที่:

✅ **Modern Stack** - Next.js 15, React 19, TypeScript
✅ **Beautiful UI** - HeroUI + Tailwind CSS + Custom animations
✅ **Fully Responsive** - Desktop, Tablet, Mobile
✅ **Multilingual** - Thai & English (URL-based i18n)
✅ **SEO Optimized** - Meta tags + Structured data
✅ **Accessible** - WCAG AA compliant
✅ **Type-Safe** - TypeScript ทั้งหมด
✅ **Production Ready** - No linter errors, Optimized performance

---

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ using Next.js 15, React 19, and TypeScript**

**Happy Coding! 🚀**
