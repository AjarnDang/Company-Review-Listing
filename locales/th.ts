export const th = {
  // Navbar
  navbar: {
    brand: "FinScope",
    home: "หน้าหลัก",
    features: "คุณสมบัติ",
    customers: "ลูกค้า",
    integrations: "การผลิตภัณฑ์",
    companies: "บริษัททั้งหมด",
    reviews: "รีวิว",
    about: "เกี่ยวกับ",
    login: "เข้าสู่ระบบ",
    signup: "สมัครสมาชิก",
  },
  
  // Menu Items
  menu: {
    profile: "โปรไฟล์",
    dashboard: "แดชบอร์ด",
    activity: "กิจกรรม",
    analytics: "การวิเคราะห์",
    system: "ระบบ",
    deployments: "การเผยแพร่",
    mySettings: "การตั้งค่าของฉัน",
    teamSettings: "การตั้งค่าทีม",
    helpFeedback: "ช่วยเหลือและข้อเสนอแนะ",
    logout: "ออกจากระบบ",
    closeMenu: "ปิดเมนู",
    openMenu: "เปิดเมนู",
  },
  
  // Home Page
  home: {
    title: "ค้นหาบริษัทการเงินที่คุณวางใจได้",
    subtitle: "อ่านรีวิวจากผู้ใช้งานจริง ค้นหาบริษัทการเงิน Fintech Broker และ Payment ที่เหมาะกับคุณ",
    searchPlaceholder: "ค้นหาชื่อบริษัท...",
    searchButton: "ค้นหา",
    featuredCompanies: "บริษัทแนะนำ",
    latestReviews: "รีวิวล่าสุด",
    viewReviews: "ดูรีวิวบริษัท",
    scrollToCompanies: "ดูรายชื่อบริษัท",
    heroTitle: "แพลตฟอร์มรีวิวบริษัทการเงิน",
    heroSubtitle: "ค้นหาบริษัทที่เหมาะสมกับคุณ จากรีวิวผู้ใช้งานจริง",
    heroDescription: "เราช่วยให้คุณตัดสินใจเลือกบริษัทการเงินได้อย่างมั่นใจ ด้วยรีวิวและคะแนนจากผู้ใช้งานจริงทั่วประเทศ",
  },
  
  // Footer
  footer: {
    about: "เกี่ยวกับเรา",
    contact: "ติดต่อ",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "เงื่อนไขการใช้งาน",
    copyright: "© 2024 FinScope สงวนลิขสิทธิ์",
  },
  
  // Common
  common: {
    language: "ภาษา",
    thai: "ไทย",
    english: "English",
    loading: "กำลังโหลด...",
    error: "เกิดข้อผิดพลาด",
    success: "สำเร็จ",
  },

  // Companies
  companies: {
    title: "รายชื่อบริษัททั้งหมด",
    subtitle: "เลือกดูรีวิวบริษัทที่คุณสนใจ",
    readMore: "อ่านรีวิว",
    viewDetails: "ดูรายละเอียด",
    reviews: "รีวิว",
    rating: "คะแนน",
    category: "หมวดหมู่",
    allCategories: "ทุกหมวดหมู่",
    filterByCategory: "กรองตามหมวดหมู่",
    searchCompanies: "ค้นหาบริษัท",
    showingResults: "แสดง {{count}} บริษัทจากทั้งหมด {{total}} บริษัท",
    noCompaniesFound: "ไม่พบบริษัทที่ตรงกับเงื่อนไข",
    categories: {
      fintech: "Fintech",
      broker: "Broker", 
      payment: "Payment",
    },
  },

  // Pagination
  pagination: {
    previous: "ก่อนหน้า",
    next: "ถัดไป",
    page: "หน้า",
    of: "จาก",
    showing: "แสดง",
    to: "ถึง",
    results: "รายการ",
  },

  // States
  states: {
    loading: {
      title: "กำลังโหลด...",
      message: "กรุณารอสักครู่",
      companies: "กำลังโหลดรายการบริษัท...",
      reviews: "กำลังโหลดรีวิว...",
      data: "กำลังโหลดข้อมูล...",
    },
    empty: {
      title: "ไม่พบข้อมูล",
      message: "ไม่พบข้อมูลที่คุณค้นหา",
      companies: "ไม่พบบริษัทที่ตรงเงื่อนไข",
      reviews: "ยังไม่มีรีวิว",
      noResults: "ไม่พบผลลัพธ์",
      tryAdjusting: "ลองปรับเงื่อนไขการค้นหาใหม่",
      clearFilters: "ล้างตัวกรอง",
      resetSearch: "ล้างการค้นหา",
      goBack: "กลับหน้าแรก",
    },
    error: {
      title: "เกิดข้อผิดพลาด",
      message: "ขออภัย เกิดข้อผิดพลาดบางอย่าง",
      loadFailed: "โหลดข้อมูลไม่สำเร็จ",
      networkError: "เชื่อมต่อเครือข่ายล้มเหลว",
      serverError: "เซิร์ฟเวอร์มีปัญหา",
      notFound: "ไม่พบหน้าที่ต้องการ",
      tryAgain: "ลองอีกครั้ง",
      retry: "โหลดใหม่",
      goHome: "กลับหน้าแรก",
      contactSupport: "ติดต่อฝ่ายสนับสนุน",
    },
  },
};

export type TranslationKeys = typeof th;