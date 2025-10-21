import type { TranslationKeys } from "./th";

export const en: TranslationKeys = {
  // Navbar
  navbar: {
    brand: "FinScope",
    home: "Home",
    features: "Features",
    customers: "Customers",
    integrations: "Integrations",
    companies: "Companies",
    reviews: "Reviews",
    about: "About",
    login: "Login",
    signup: "Sign Up",
    getStarted: "Get Started",
  },
  
  // Menu Items
  menu: {
    profile: "Profile",
    dashboard: "Dashboard",
    activity: "Activity",
    analytics: "Analytics",
    system: "System",
    deployments: "Deployments",
    mySettings: "My Settings",
    teamSettings: "Team Settings",
    helpFeedback: "Help & Feedback",
    logout: "Log Out",
    closeMenu: "Close menu",
    openMenu: "Open menu",
  },
  
  // Home Page
  home: {
    title: "Find Financial Companies You Can ",
    titleHighlight: "Trust",
    subtitle: "Read real user reviews and find the best Fintech, Broker, and Payment companies for you",
    searchPlaceholder: "Search company name...",
    searchButton: "Search",
    featuredCompanies: "Featured Companies",
    latestReviews: "Latest Reviews",
    viewReviews: "View Company Reviews",
    scrollToCompanies: "Browse Companies",
    heroTitle: "Financial Company Review Platform",
    heroSubtitle: "Find the right company for you from real user reviews",
    heroDescription: "We help you make confident decisions when choosing financial companies through authentic reviews and ratings from users across the country",
  },
  
  // Footer
  footer: {
    about: "About Us",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "© 2024 FinScope. All rights reserved.",
  },

  // 404 Not Found
  notFound: {
    title: "Page Not Found",
    message: "Sorry, the page you're looking for doesn't exist or has been moved.",
    goHome: "Go to Homepage",
    browseCompanies: "Browse Companies",
    needHelp: "Need help?",
    contactSupport: "Contact Support",
  },
  
  // Common
  common: {
    language: "Language",
    thai: "ไทย",
    english: "English",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },

  // Companies
  companies: {
    title: "All Companies",
    subtitle: "Browse and read reviews of companies you're interested in",
    exploreAll: "Explore all financial companies and find the best one for you",
    readMore: "Read Reviews",
    viewDetails: "View Details",
    reviews: "reviews",
    rating: "rating",
    category: "Category",
    allCategories: "All Categories",
    filterByCategory: "Filter by Category",
    searchCompanies: "Search Companies",
    showingResults: "Showing {{count}} companies of {{total}} total",
    noCompaniesFound: "No companies match your criteria",
    activeFilters: "Active Filters",
    clearAllFilters: "Clear All Filters",
    visitWebsite: "Visit Website",
    statistics: "Statistics",
    totalReviews: "Total Reviews",
    recentReviews: "Recent Reviews",
    reviewsComingSoon: "Reviews coming soon",
    shareExperience: "Share Your Experience",
    shareExperienceDescription: "Help others make informed decisions by sharing your experience with this company",
    writeReview: "Write a Review",
    categories: {
      fintech: "Fintech",
      broker: "Broker",
      payment: "Payment",
      bank: "Bank",
    },
  },

  // Search
  search: {
    placeholder: "Search companies, categories, or keywords...",
    recentSearches: "Recent Searches",
    suggestions: "Popular Searches",
    noRecentSearches: "No recent searches",
    clearAll: "Clear All",
    searchSuggestions: {
      bestTradingPlatforms: "Best trading platforms",
      personalLoans: "Personal loans",
      bestSavingsAccounts: "Best savings accounts",
      cryptoExchange: "Cryptocurrency exchange",
      stockBrokers: "Stock brokers",
      digitalWallet: "Digital wallet",
      investmentApps: "Investment apps",
      paymentGateway: "Payment gateway",
    },
  },

  // Pagination
  pagination: {
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    showing: "Showing",
    to: "to",
    results: "results",
  },

  // States
  states: {
    loading: {
      title: "Loading...",
      message: "Please wait a moment",
      companies: "Loading companies...",
      reviews: "Loading reviews...",
      data: "Loading data...",
    },
    empty: {
      title: "No Data Found",
      message: "No data matches your search",
      companies: "No companies match your criteria",
      reviews: "No reviews yet",
      noResults: "No results found",
      tryAdjusting: "Try adjusting your search criteria",
      clearFilters: "Clear Filters",
      resetSearch: "Reset Search",
      goBack: "Go Back",
      companyNotFound: "Company Not Found",
      companyNotFoundMessage: "The company you're looking for doesn't exist or has been removed",
    },
    error: {
      title: "Error Occurred",
      message: "Sorry, something went wrong",
      loadFailed: "Failed to load data",
      networkError: "Network connection failed",
      serverError: "Server error",
      notFound: "Page not found",
      tryAgain: "Try Again",
      retry: "Retry",
      goHome: "Go Home",
      contactSupport: "Contact Support",
    },
  },

  // CTA Section
  cta: {
    badge: "We're FinScope",
    title: "Empowering Trust in Financial Services",
    description: "We're a review platform that's open to everyone. Our vision is to become the universal symbol of trust — by empowering people to shop with confidence, and helping companies improve.",
    features: {
      transparent: {
        title: "Transparent Reviews",
        description: "Honest feedback from real customers to help you make informed decisions",
      },
      community: {
        title: "Community Driven",
        description: "Built by the community, for the community. Every voice matters",
      },
      improving: {
        title: "Always Improving",
        description: "Continuously evolving to serve you better with new features",
      },
    },
    exploreCompanies: "Explore Companies",
    learnMore: "Learn More About Us",
  },

  // Testimonials
  testimonials: {
    badge: "Testimonials",
    title: "What Our Users Say",
    subtitle: "Join thousands of satisfied users who trust FinScope for honest, reliable financial service reviews",
    shareExperience: "Want to share your experience?",
    writeReview: "Write a Review",
    browseCompanies: "Browse All Companies",
    verifiedReview: "Verified Review",
  },

  // Category Pages
  category: {
    exploreText: "Explore the best {{category}} companies",
    bestIn: "Best in {{category}}",
    topRated: "Top rated {{category}} companies",
    seeMore: "See More",
    noCategoriesFound: "No companies found in this category",
  },

  // Reviews
  reviews: {
    title: "Customer Reviews",
    trustScore: "TrustScore",
    basedOn: "Based on {{count}} reviews",
    writeReview: "Write a review",
    verified: "Verified",
    helpful: "Helpful",
    markHelpful: "Mark as helpful",
    companyReplied: "Company replied",
    sortBy: "Sort by:",
    filterBy: "Filter by rating:",
    allRatings: "All ratings",
    newest: "Newest",
    highest: "Highest rated",
    lowest: "Lowest rated",
    mostHelpful: "Most helpful",
    showMore: "Show more reviews",
    showLess: "Show less",
    noReviews: "No reviews yet",
    noReviewsMessage: "Be the first to write a review for this company!",
    stars: "stars",
    star: "star",
    reviewSummary: "Review Summary",
    excellentService: "Excellent service",
    verifiedPurchase: "Verified purchase",
    daysAgo: "{{count}} days ago",
    monthsAgo: "{{count}} months ago",
    yearsAgo: "{{count}} years ago",
    today: "Today",
    yesterday: "Yesterday",
    overview: "Overview",
    reviewsTab: "Reviews",
  },

  // Business CTA Section
  businessCta: {
    headline: "Looking to grow your business?",
    description: "Strengthen your reputation with reviews on FinScope.",
    ctaButton: "Get Started",
    features: {
      visibility: {
        title: "Increase Visibility",
        description: "Reach thousands of potential customers searching for financial services",
      },
      trust: {
        title: "Build Trust",
        description: "Showcase authentic customer reviews and build credibility",
      },
      insights: {
        title: "Get Insights",
        description: "Understand your customers better with detailed feedback analytics",
      },
    },
  },
};