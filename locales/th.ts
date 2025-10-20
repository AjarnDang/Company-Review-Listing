export const th = {
  // Navbar
  navbar: {
    brand: "บริษัทรีวิว",
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
    title: "ค้นหาบริษัทที่ดีที่สุดสำหรับคุณ",
    subtitle: "อ่านรีวิวจากพนักงานจริง ค้นหาวัฒนธรรมองค์กร เงินเดือน และสวัสดิการ",
    searchPlaceholder: "ค้นหาชื่อบริษัท...",
    searchButton: "ค้นหา",
    featuredCompanies: "บริษัทแนะนำ",
    latestReviews: "รีวิวล่าสุด",
  },
  
  // Footer
  footer: {
    about: "เกี่ยวกับเรา",
    contact: "ติดต่อ",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "เงื่อนไขการใช้งาน",
    copyright: "© 2024 บริษัทรีวิว สงวนลิขสิทธิ์",
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

