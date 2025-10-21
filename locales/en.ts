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
    title: "Find Financial Companies You Can Trust",
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
    categories: {
      fintech: "Fintech",
      broker: "Broker",
      payment: "Payment",
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
};