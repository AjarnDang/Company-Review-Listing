# 🏢 Company Review Listing Platform

แพลตฟอร์มรีวิวบริษัทการเงิน รองรับภาษาไทยและอังกฤษ พร้อม SEO และ Accessibility ระดับมาตรฐานสากล

## 📋 สารบัญ

- [ภาพรวมโปรเจค](#ภาพรวมโปรเจค)
- [เทคโนโลยี](#เทคโนโลยี)
- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [การติดตั้งและรัน](#การติดตั้งและรัน)
- [React Hooks ที่ใช้](#react-hooks-ที่ใช้)
- [ระบบ i18n](#ระบบ-i18n)
- [State Management](#state-management)
- [Accessibility & SEO](#accessibility--seo)
- [Development Guide](#development-guide)

---

## 🎯 ภาพรวมโปรเจค

เว็บไซต์สำหรับรีวิวและค้นหาบริษัทการเงิน (Fintech, Broker, Payment) ที่ผู้ใช้สามารถ:
- **ค้นหา** บริษัทด้วยชื่อหรือคำอธิบาย
- **กรอง** ตามหมวดหมู่ (multi-select)
- **ดูคะแนนและรีวิว** จากผู้ใช้งานจริง
- **เปลี่ยนภาษา** ระหว่างไทย/อังกฤษแบบ real-time

---

## 🛠️ เทคโนโลยี

### Frontend Framework
- **Next.js 15.5.6** (App Router) - React framework พร้อม SSR/SSG
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety

### UI & Styling
- **HeroUI 2.8.5** - React component library
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 12** - Animation library

### อื่นๆ
- **i18n** - URL-based internationalization
- **JSON** - Mock data storage

---

## ✨ คุณสมบัติหลัก

### 1. Landing Page
- Hero Section พร้อม CTA buttons
- Smooth scroll to company list
- แสดงสถิติ (15+ companies, 2,000+ reviews)
- Responsive design (Desktop/Tablet/Mobile)

### 2. Company Listing
- แสดง 15 บริษัท พร้อมข้อมูล:
  - Logo, ชื่อ, หมวดหมู่
  - คะแนนดาว (1-5) พร้อม half-star
  - จำนวนรีวิว
  - คำอธิบายย่อ
- Grid layout (3/2/1 columns)
- Pagination (9 items/page)

### 3. Search & Filter
- **Real-time Search** - ค้นหาชื่อและคำอธิบาย
- **Multi-select Category** - เลือกได้หลายหมวดหมู่
- **Clear Filters** - ล้างตัวกรองทั้งหมด
- ทำงานร่วมกับ Pagination

### 4. State Management
- **Loading State** - Skeleton UI (4 types)
- **Empty State** - แสดงเมื่อไม่พบข้อมูล
- **Error State** - แสดงข้อผิดพลาด + Retry button
- Auto state management

### 5. Internationalization (i18n)
- **URL-based Routing** - `/th` และ `/en`
- **Dynamic Switching** - เปลี่ยนภาษาทันที
- **SEO-friendly** - แต่ละภาษามี URL แยก
- **Type-safe** - TypeScript validation

### 6. SEO Optimization
- **Meta Tags** - Dynamic title, description, OG tags
- **Structured Data** - JSON-LD (Organization, ItemList)
- **Social Sharing** - Facebook, Twitter preview
- **Multi-language** - hreflang tags

### 7. Accessibility (WCAG AA)
- **Semantic HTML** - main, section, article
- **ARIA Attributes** - labels, roles, live regions
- **Keyboard Navigation** - Tab, Enter, Space
- **Screen Reader** - ทุก element อ่านได้
- **Focus Visible** - outline styles ชัดเจน
- **Skip Navigation** - "Skip to main content"
- **Color Contrast** - 4.5:1 minimum (WCAG AA)

---

## 📁 โครงสร้างโปรเจค

```
├── app/
│   ├── [lang]/              # Dynamic locale routes
│   │   ├── layout.tsx       # Root layout (Server Component)
│   │   └── page.tsx         # Home page (Client Component)
│   ├── globals.css          # Global styles + a11y utilities
│   └── provider.tsx         # Client providers wrapper
│
├── components/
│   ├── landing/
│   │   └── HeroSection.tsx  # Hero section component
│   ├── company/
│   │   ├── CompanyCard.tsx       # Company card with rating
│   │   ├── CompanyFilters.tsx    # Search + category filters
│   │   └── CompanyPagination.tsx # Pagination controls
│   ├── states/
│   │   ├── LoadingSkeleton.tsx   # Loading UI
│   │   ├── EmptyState.tsx        # Empty state UI
│   │   ├── ErrorState.tsx        # Error state UI
│   │   └── StateWrapper.tsx      # All-in-one wrapper
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer
│   └── LanguageSwitcher.tsx # Language toggle button
│
├── hooks/
│   ├── useAsyncData.ts      # Async data fetching + states
│   ├── useCompanies.ts      # Company filter + pagination
│   └── useSearchFilter.ts   # Client-side search
│
├── contexts/
│   └── AppStateContext.tsx  # Global state context
│
├── lib/
│   ├── get-dictionary.ts    # Get translations
│   └── seo.ts              # SEO utilities + schemas
│
├── locales/
│   ├── th.ts               # Thai translations
│   ├── en.ts               # English translations
│   └── index.ts            # Export all
│
├── types/
│   └── company.ts          # TypeScript interfaces
│
├── data/
│   └── companies.json      # Mock company data (15 items)
│
├── i18n.config.ts          # i18n configuration
├── middleware.ts           # Locale detection & redirect
└── next.config.ts          # Next.js config + image domains
```

---

## 🚀 การติดตั้งและรัน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รัน Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:3000

- ภาษาไทย: http://localhost:3000/th
- English: http://localhost:3000/en

### 3. Build สำหรับ Production

```bash
npm run build
npm run start
```

---

## 🎣 React Hooks ที่ใช้

### 1. `use()` - React 19 (Unwrap Promises)

**ใช้ใน:** Client Components เพื่อ unwrap params Promise

```tsx
// app/[lang]/page.tsx
import { use } from 'react';

export default function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  // Next.js 15 ทำให้ params เป็น Promise
  // ใช้ use() เพื่อ unwrap Promise ออกมา
  const { lang } = use(params);
  
  // ตอนนี้ lang พร้อมใช้งาน
  const t = getDictionary(lang);
}
```

**เหตุผล:** Next.js 15 เปลี่ยน params เป็น Promise เพื่อรองรับ async routing

---

### 2. `useRef()` - Reference DOM Elements

**ใช้ใน:** Smooth scroll to section

```tsx
// app/[lang]/page.tsx
const companiesRef = useRef<HTMLDivElement>(null);

// Scroll to companies section
const scrollToCompanies = () => {
  companiesRef.current?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start',
  });
};

return (
  <section ref={companiesRef}>
    {/* Companies grid */}
  </section>
);
```

**เหตุผล:** 
- เก็บ reference ไปยัง DOM element
- ไม่ทำให้ component re-render
- ใช้สำหรับ imperative actions (scroll, focus)

---

### 3. `useEffect()` - Side Effects

**ใช้ใน:** เพิ่ม structured data (JSON-LD) ใน head

```tsx
// app/[lang]/page.tsx
useEffect(() => {
  if (companies && companies.length > 0) {
    // สร้าง script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generateCompanyListSchema(lang, companies));
    script.id = 'company-list-schema';
    
    // เพิ่มเข้า head
    document.head.appendChild(script);

    // Cleanup: ลบออกเมื่อ component unmount
    return () => {
      const existingScript = document.getElementById('company-list-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }
}, [companies, lang]); // Re-run เมื่อ companies หรือ lang เปลี่ยน
```

**เหตุผล:**
- จัดการ side effects (DOM manipulation)
- รันหลัง component render
- Cleanup function ทำงานเมื่อ unmount หรือ dependencies เปลี่ยน

---

### 4. `useState()` - Component State

**ใช้ใน:** หลายที่ เช่น filters, pagination, menu

```tsx
// hooks/useCompanies.ts
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategories, setSelectedCategories] = useState<CompanyCategory[]>([]);
const [currentPage, setCurrentPage] = useState(1);
```

**เหตุผล:**
- เก็บ state ที่เปลี่ยนแปลงได้
- เมื่อ state เปลี่ยน → component re-render
- ใช้สำหรับ interactive UI

---

### 5. `useMemo()` - Memoize Calculations

**ใช้ใน:** Filter companies โดยไม่ re-calculate ทุก render

```tsx
// hooks/useCompanies.ts
const filteredCompanies = useMemo(() => {
  let filtered = companies;

  // Filter by search
  if (searchTerm.trim()) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(company =>
      company.name.toLowerCase().includes(lowerSearch) ||
      company.description.toLowerCase().includes(lowerSearch)
    );
  }

  // Filter by categories
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(company =>
      selectedCategories.includes(company.category)
    );
  }

  return filtered;
}, [companies, searchTerm, selectedCategories]);
```

**เหตุผล:**
- Cache ผลลัพธ์ของการคำนวณ
- Re-calculate เฉพาะเมื่อ dependencies เปลี่ยน
- ประหยัด performance (ไม่ filter ซ้ำทุก render)

---

### 6. `useCallback()` - Memoize Functions

**ใช้ใน:** ป้องกัน re-create functions ทุก render

```tsx
// contexts/AppStateContext.tsx
const setError = useCallback((error: ErrorState) => {
  setState((prev) => ({ 
    ...prev, 
    error, 
    isLoading: false,
    isEmpty: false 
  }));
}, []); // ไม่มี dependencies = สร้างครั้งเดียว

const clearError = useCallback(() => {
  setState((prev) => ({ ...prev, error: null }));
}, []);
```

**เหตุผล:**
- Cache function reference
- ป้องกัน re-render ของ child components
- ใช้คู่กับ React.memo() เพื่อ optimize

---

### 7. Custom Hooks

#### `useAsyncData()` - Fetch Data + Auto State

```tsx
// hooks/useAsyncData.ts
export function useAsyncData<T>({
  fetchFn,
  dependencies = [],
  onSuccess,
  onError,
}) {
  const [data, setData] = useState<T>(null as T);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, isLoading, error, refetch: fetchData };
}
```

**วิธีใช้:**
```tsx
const { data, isLoading, error, refetch } = useAsyncData({
  fetchFn: async () => {
    const res = await fetch('/api/companies');
    return res.json();
  },
  dependencies: [filters],
});
```

**เหตุผล:**
- รวม logic การ fetch data และ state management
- Reusable ใช้ได้หลายที่
- Auto handle loading, error, success

---

#### `useCompanies()` - Filter + Pagination Logic

```tsx
// hooks/useCompanies.ts
export function useCompanies({ companies, itemsPerPage = 9 }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter companies (memoized)
  const filteredCompanies = useMemo(() => {
    // ... filtering logic
  }, [companies, searchTerm, selectedCategories]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    displayedCompanies,
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedCategories,
    setSelectedCategories,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredCount: filteredCompanies.length,
    totalCount: companies.length,
  };
}
```

**เหตุผล:**
- แยก business logic ออกจาก UI
- Reusable และ testable
- Auto reset pagination เมื่อ filter เปลี่ยน

---

## 🌐 ระบบ i18n

### URL-based Routing Pattern

```
/          → redirect to /th (default)
/th        → Thai version
/en        → English version
/th/about  → Thai about page
/en/about  → English about page
```

### Architecture

```
1. middleware.ts
   ↓ ตรวจจับภาษา (cookie, browser, default)
   ↓ redirect ไป /[lang]

2. app/[lang]/layout.tsx
   ↓ รับ params.lang (Promise)
   ↓ await params
   ↓ pass lang to components

3. Components
   ↓ รับ lang เป็น props
   ↓ getDictionary(lang)
   ↓ แสดงข้อความตามภาษา
```

### การสลับภาษา

```tsx
// components/LanguageSwitcher.tsx
const pathname = usePathname(); // /th/about
const newLang = currentLang === 'th' ? 'en' : 'th';
const newPath = pathname.replace('/th/', '/en/'); // /en/about

<Link href={newPath}>
  {currentLang === 'th' ? 'EN' : 'TH'}
</Link>
```

### เพิ่มคำแปลใหม่

1. เพิ่มใน `locales/th.ts`:
```ts
export const th = {
  products: {
    title: "ผลิตภัณฑ์",
    description: "รายการผลิตภัณฑ์"
  }
}
```

2. เพิ่มใน `locales/en.ts`:
```ts
export const en: TranslationKeys = {
  products: {
    title: "Products",
    description: "Product list"
  }
}
```

3. ใช้งาน:
```tsx
const t = getDictionary(lang);
<h1>{t.products.title}</h1>
```

---

## 🗄️ State Management

### Global State (AppStateContext)

```tsx
// contexts/AppStateContext.tsx
const { state, startLoading, stopLoading, setError } = useAppState();

// ตัวอย่างการใช้
const fetchData = async () => {
  try {
    startLoading();           // Set loading = true
    const data = await fetch(...);
    setSuccess();             // Clear all states
  } catch (error) {
    setError(error);          // Set error state
  }
};
```

### Local State (Custom Hooks)

แต่ละ hook จัดการ state ของตัวเอง:
- `useAsyncData` → data, loading, error
- `useCompanies` → filters, pagination
- `useSearchFilter` → search term, filtered data

### State Priority

```
Loading > Error > Empty > Success
```

**StateWrapper** จัดการ states อัตโนมัติ:
```tsx
<StateWrapper
  isLoading={isLoading}
  error={error}
  isEmpty={!data?.length}
  loadingType="card"
  onRetry={refetch}
>
  <YourContent data={data} />
</StateWrapper>
```

---

## ♿ Accessibility & SEO

### Accessibility Features

**1. Semantic HTML**
```html
<main id="main-content">
  <section aria-labelledby="companies-heading">
    <h2 id="companies-heading">รายชื่อบริษัททั้งหมด</h2>
    <article><!-- Company card --></article>
  </section>
</main>
```

**2. ARIA Attributes**
```tsx
// Search region
<div role="search" aria-label="ค้นหาบริษัท">
  <Input aria-label="ค้นหาชื่อบริษัท" />
</div>

// Star rating
<div role="img" aria-label="คะแนน: 4.5 จาก 5">
  {renderStars(4.5)}
</div>

// Live announcements
<p role="status" aria-live="polite">
  แสดง 6 จาก 15 บริษัท
</p>
```

**3. Keyboard Navigation**
```tsx
// Category filters
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleCategory(category);
  }
}}
```

**4. Skip Navigation**
```html
<!-- Tab แรก → แสดงลิงก์นี้ -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**5. Focus Styles**
```css
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

button:focus-visible {
  outline: 3px solid #3b82f6;
}
```

### SEO Features

**1. Meta Tags**
```tsx
// app/[lang]/layout.tsx
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: "บริษัทรีวิว - แพลตฟอร์มรีวิวบริษัทการเงิน",
    description: "...",
    openGraph: { ... },
    twitter: { ... },
    alternates: {
      canonical: "/th",
      languages: {
        'th': '/th',
        'en': '/en',
      }
    }
  };
}
```

**2. Structured Data (JSON-LD)**
```tsx
// Organization Schema
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "บริษัทรีวิว",
  "url": "http://localhost:3000/th",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "http://localhost:3000/th?search={search_term_string}"
  }
}

// ItemList Schema
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "numberOfItems": 15,
  "itemListElement": [...]
}
```

---

## 💻 Development Guide

### เพิ่ม Component ใหม่

```tsx
// components/YourComponent.tsx
"use client";

import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n.config';

interface Props {
  lang: Locale;
}

export default function YourComponent({ lang }: Props) {
  const t = getDictionary(lang);
  
  return (
    <div>
      <h2>{t.yourSection.title}</h2>
    </div>
  );
}
```

### เพิ่มหน้าใหม่

```tsx
// app/[lang]/about/page.tsx
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';

export default function AboutPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params; // Server Component
  const t = getDictionary(lang);
  
  return (
    <div>
      <h1>{t.about.title}</h1>
    </div>
  );
}
```

### เพิ่ม Custom Hook

```tsx
// hooks/useYourHook.ts
import { useState, useCallback } from 'react';

export function useYourHook() {
  const [state, setState] = useState(initialValue);
  
  const action = useCallback(() => {
    // Your logic
  }, [dependencies]);
  
  return { state, action };
}
```

### Code Style

```tsx
// Good
const { lang } = use(params);          // Client component
const { lang } = await params;         // Server component
const t = getDictionary(lang);         // Get translations
<Button aria-label={t.button.label}>  // Accessibility

// ❌ Bad
const lang = params.lang;              // Error in Next.js 15
<div onClick={...}>Text</div>          // Use <button>
<img src="..." />                      // Use <Image> from next/image
```

---

## 🧪 Testing

### Manual Testing Checklist

**Functionality:**
- [ ] Search ทำงาน (real-time)
- [ ] Category filter ทำงาน (multi-select)
- [ ] Pagination เปลี่ยนหน้าได้
- [ ] Clear filters ลบตัวกรองทั้งหมด
- [ ] Language switch เปลี่ยนภาษาทันที

**Responsive:**
- [ ] Desktop (>1024px) - 3 columns
- [ ] Tablet (640-1024px) - 2 columns
- [ ] Mobile (<640px) - 1 column

**Accessibility:**
- [ ] Tab ผ่านทุก element
- [ ] Focus visible ชัดเจน
- [ ] Enter/Space activate elements
- [ ] Skip navigation ทำงาน

**SEO:**
- [ ] View source → เห็น meta tags
- [ ] Structured data valid (Google Rich Results Test)
- [ ] Social preview ถูกต้อง (Facebook Debugger)

### Automated Testing

```bash
# Lighthouse audit
npx lighthouse http://localhost:3000/th --view

# Expected scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 95+
```

---

## 📚 Resources

### Documentation
- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [HeroUI](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### SEO
- [Schema.org](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Open Graph Protocol](https://ogp.me/)

---

## 🎯 Summary

โปรเจคนี้ประกอบด้วย:

**Architecture:**
- Next.js 15 App Router
- TypeScript ทั้งหมด
- URL-based i18n
- Component-based architecture

**React Hooks:**
- `use()` - unwrap params Promise
- `useRef()` - DOM references
- `useEffect()` - side effects
- `useState()` - component state
- `useMemo()` - memoize calculations
- `useCallback()` - memoize functions
- Custom hooks - reusable logic

**Features:**
- Search & Multi-select Filter
- Pagination
- State Management (Loading/Empty/Error)
- i18n (TH/EN)
- SEO (Meta tags, Structured data)
- Accessibility (WCAG AA)

**Production Ready:**
- No linter errors
- Type-safe
- Performance optimized
- SEO optimized
- Accessible

---

## 📄 License

MIT

---

## 👥 Contributors

Built with ❤️ using Next.js 15, React 19, and TypeScript

**Happy Coding! 🚀**
