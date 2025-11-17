# فروشگاه اینترنتی قهوه | Coffee Shop

یک فروشگاه آنلاین مدرن و کامل برای فروش قهوه با استفاده از تکنولوژی‌های روز دنیا.

## 📋 فهرست مطالب

- [ویژگی‌های کلیدی](#ویژگی‌های-کلیدی)
- [تکنولوژی‌های استفاده شده](#تکنولوژی‌های-استفاده-شده)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [متغیرهای محیطی](#متغیرهای-محیطی)
- [ساختار پروژه](#ساختار-پروژه)
- [API Documentation](#api-documentation)
- [توسعه و مشارکت](#توسعه-و-مشارکت)

## ✨ ویژگی‌های کلیدی

- 🛍️ **فروشگاه کامل**: مدیریت محصولات، سبد خرید و پردازش سفارشات
- 👤 **مدیریت کاربران**: ثبت‌نام، ورود، پنل کاربری و پنل مدیریت
- 💬 **سیستم نظرات**: امکان ثبت و مدیریت نظرات محصولات
- 📝 **بلاگ**: بخش مقالات و محتوای آموزشی
- 🎫 **تیکتینگ**: سیستم پشتیبانی و ارتباط با مشتریان
- 📱 **Responsive Design**: طراحی واکنشگرا برای تمام دستگاه‌ها
- 🌐 **RTL Support**: پشتیبانی کامل از زبان فارسی
- ⚡ **Performance Optimized**: بهینه‌سازی شده برای سرعت و عملکرد

## 🚀 تکنولوژی‌های استفاده شده

### Frontend

- **Next.js 15.4.2** - React Framework with App Router
- **React 19.1.0** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **React Query** - State Management & Data Fetching
- **React Hook Form** - Form Management
- **Swiper.js** - Carousel/Slider Components

### Backend

- **Next.js API Routes** - Backend API
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

### Development Tools

- **ESLint** - Code Linting
- **PostCSS** - CSS Processing
- **NextJS TopLoader** - Loading Indicator

## 📦 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js (نسخه 18 یا بالاتر)
- npm یا yarn
- MongoDB

### مراحل نصب

1. **کلون کردن پروژه:**

```bash
git clone [repository-url]
cd my-shop-project
```

2. **نصب وابستگی‌ها:**

```bash
npm install
# یا
yarn install
```

3. **تنظیم متغیرهای محیطی:**

```bash
cp .env.example .env.local
```

4. **راه‌اندازی دیتابیس:**

- MongoDB را راه‌اندازی کنید
- رشته اتصال را در `.env.local` قرار دهید

5. **اجرای پروژه:**

```bash
npm run dev
# یا
yarn dev
```

6. **مشاهده پروژه:**
   مرورگر خود را به آدرس [http://localhost:3000](http://localhost:3000) باز کنید.

## 🔧 متغیرهای محیطی

فایل `.env.local` را ایجاد کنید و متغیرهای زیر را تنظیم کنید:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/coffee-shop
# یا برای MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coffee-shop

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Environment
NODE_ENV=development
```

## 📁 ساختار پروژه

```
my-shop-project/
├── configs/                 # تنظیمات پروژه
│   ├── db.ts               # اتصال دیتابیس
│   └── global.ts           # متغیرهای سراسری
├── public/                 # فایل‌های استاتیک
│   └── fonts/              # فونت‌های پروژه
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # صفحات احراز هویت
│   │   ├── (panels)/       # پنل‌های کاربری و مدیریت
│   │   ├── (site)/         # صفحات عمومی سایت
│   │   ├── _components/    # کامپوننت‌های مشترک
│   │   │   ├── icons/      # آیکن‌ها
│   │   │   ├── ui/         # UI Components
│   │   │   └── types/      # Type Components
│   │   └── api/            # API Routes
│   ├── action/             # Server Actions
│   ├── core/               # هسته پروژه
│   │   └── http-service/   # سرویس HTTP
│   ├── data/               # داده‌های ثابت
│   ├── enums/              # Enums
│   ├── hooks/              # Custom Hooks
│   ├── lib/                # کتابخانه‌های کمکی
│   ├── models/             # Mongoose Models
│   ├── providers/          # React Providers
│   ├── store/              # State Management
│   ├── tailwind/           # Tailwind Configuration
│   ├── types/              # TypeScript Interfaces
│   └── utils/              # ابزارهای کمکی
└── ...configuration files
```

## 🔌 API Documentation

### Authentication

- `POST /api/auth/signin` - ورود کاربر
- `POST /api/auth/signup` - ثبت‌نام کاربر
- `POST /api/auth/verify` - تایید کاربر

### Products

- `GET /api/products` - دریافت لیست محصولات
- `GET /api/products/[id]` - دریافت جزئیات محصول
- `POST /api/products` - ایجاد محصول جدید (ادمین)
- `PUT /api/products/[id]` - ویرایش محصول (ادمین)
- `DELETE /api/products/[id]` - حذف محصول (ادمین)

### Comments

- `GET /api/comments` - دریافت نظرات
- `POST /api/comments` - ثبت نظر جدید
- `PUT /api/comments/[id]` - ویرایش نظر
- `DELETE /api/comments/[id]` - حذف نظر

### User Management

- `GET /api/user/profile` - دریافت اطلاعات پروفایل
- `PUT /api/user/profile` - ویرایش پروفایل
- `GET /api/user/orders` - دریافت سفارشات کاربر

## 🏗️ Scripts

```bash
# اجرای محیط توسعه
npm run dev

# ساخت پروژه برای production
npm run build

# اجرای پروژه در حالت production
npm run start

# بررسی کیفیت کد
npm run lint
```

## 🎨 UI Components

پروژه شامل مجموعه کاملی از کامپوننت‌های UI است:

- **Form Elements**: Textbox, Textarea, Button, Radio Rating
- **Layout**: Accordion, Tabs, Dialog, Stepper
- **Data Display**: Badge, Avatar, Price, Rating, Progress
- **Feedback**: Alert, Loading, Notification
- **Media**: Video Player, Timer

## 📱 Features

### کاربران عادی

- مرور و جستجوی محصولات
- مشاهده جزئیات محصولات و نظرات
- ثبت‌نام و ورود به حساب کاربری
- مدیریت پروفایل شخصی
- ثبت نظر برای محصولات
- ایجاد تیکت پشتیبانی

### مدیریت

- مدیریت محصولات (افزودن، ویرایش، حذف)
- مدیریت کاربران
- مدیریت نظرات
- مدیریت تیکت‌ها
- مدیریت دسته‌بندی‌ها
- مدیریت تخفیف‌ها

## 🤝 توسعه و مشارکت

1. پروژه را Fork کنید
2. یک branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را commit کنید (`git commit -m 'Add amazing feature'`)
4. به branch خود push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request ایجاد کنید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 🐛 گزارش باگ

برای گزارش باگ یا درخواست ویژگی جدید، لطفاً از بخش Issues استفاده کنید.

## 📞 پشتیبانی

برای سوالات و پشتیبانی:

- ایجاد تیکت در سیستم
- ایمیل به پشتیبانی
- بخش Issues در گیت‌هاب

---
