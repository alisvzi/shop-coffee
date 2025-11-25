// Environment Variables
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Environment Flags
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_TEST = process.env.NODE_ENV === "test";

// Database Configuration
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/coffee-shop";

// JWT Configuration
export const JWT_SECRET =
  process.env.JWT_SECRET || "fallback-secret-for-development";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Application Configuration
export const APP_NAME = "فروشگاه اینترنتی قهوه";
export const APP_DESCRIPTION = "فروشگاه آنلاین قهوه با بهترین کیفیت";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// File Upload Configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const UPLOAD_DIR = "/uploads";

// Cache Configuration
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

// Rate Limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
} as const;

// Email Configuration (if needed in future)
export const EMAIL_CONFIG = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  FROM_EMAIL: process.env.FROM_EMAIL || "noreply@coffeeshop.com",
} as const;

// Payment Configuration (for future use)
export const PAYMENT_CONFIG = {
  CURRENCY: "IRR",
  GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
  MERCHANT_ID: process.env.PAYMENT_MERCHANT_ID,
} as const;

// Security Configuration
export const SECURITY = {
  BCRYPT_ROUNDS: 12,
  PASSWORD_MIN_LENGTH: 8,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutes
} as const;

// Validation Rules
export const VALIDATION = {
  PRODUCT_NAME_MAX_LENGTH: 100,
  PRODUCT_DESC_MAX_LENGTH: 1000,
  COMMENT_MAX_LENGTH: 500,
  PHONE_REGEX: /^09\d{9}$/,
  NATIONAL_ID_REGEX: /^\d{10}$/,
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_COMMENTS: true,
  ENABLE_WISHLIST: true,
  ENABLE_DISCOUNTS: true,
  ENABLE_BLOG: true,
  ENABLE_TICKETS: true,
  ENABLE_NOTIFICATIONS: true,
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  TELEGRAM: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  TWITTER: process.env.NEXT_PUBLIC_TWITTER_URL,
} as const;

// Contact Information
export const CONTACT_INFO = {
  PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
  EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  ADDRESS: process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
} as const;

// Error Messages (Persian)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "خطا در برقراری ارتباط با سرور",
  UNAUTHORIZED: "شما مجوز دسترسی به این بخش را ندارید",
  NOT_FOUND: "محتوای درخواستی یافت نشد",
  VALIDATION_ERROR: "اطلاعات وارد شده نامعتبر است",
  SERVER_ERROR: "خطای داخلی سرور",
} as const;

// Success Messages (Persian)
export const SUCCESS_MESSAGES = {
  CREATED: "با موفقیت ایجاد شد",
  UPDATED: "با موفقیت بروزرسانی شد",
  DELETED: "با موفقیت حذف شد",
  SENT: "با موفقیت ارسال شد",
} as const;

// Development Utilities
export const logConfig = () => {
  if (IS_DEVELOPMENT) {
    console.log("🚀 Application Configuration:", {
      NODE_ENV: process.env.NODE_ENV,
      API_URL,
      APP_URL,
      IS_PRODUCTION,
      IS_DEVELOPMENT,
    });
  }
};

// Validate required environment variables
export const validateEnvVars = () => {
  const requiredVars = ["MONGODB_URI", "JWT_SECRET"];

  if (IS_PRODUCTION) {
    requiredVars.push("NEXT_PUBLIC_APP_URL");
  }

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};

// Initialize configuration
if (typeof window === "undefined") {
  // Server-side only
  try {
    validateEnvVars();
    logConfig();
  } catch (error) {
    console.error("❌ Configuration Error:", error);
    if (IS_PRODUCTION) {
      process.exit(1);
    }
  }
}
