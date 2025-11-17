# Development Guidelines - Coffee Shop Project

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Component Guidelines](#component-guidelines)
- [API Development](#api-development)
- [Database Guidelines](#database-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Performance Guidelines](#performance-guidelines)
- [Security Guidelines](#security-guidelines)

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Git
- VS Code (recommended)

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Fill in required environment variables
3. Run `npm install`
4. Start MongoDB service
5. Run `npm run dev`

## 🏗️ Project Structure

### Directory Organization
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (panels)/          # Dashboard routes
│   ├── (site)/            # Public routes
│   ├── _components/       # Shared components
│   └── api/               # API routes
├── core/                  # Core utilities
├── models/                # Mongoose models
├── types/                 # TypeScript types
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
└── providers/             # Context providers
```

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Pages**: kebab-case (`user-profile/page.tsx`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Types/Interfaces**: PascalCase with prefix (`IUser`, `TProductStatus`)

## 📝 Coding Standards

### TypeScript Guidelines

#### Interface Naming
```typescript
// ✅ Good
interface IUser {
  id: string;
  name: string;
}

type TProductStatus = 'active' | 'inactive' | 'draft';

// ❌ Bad
interface User {
  id: string;
  name: string;
}
```

#### Function Components
```typescript
// ✅ Good - Use function declarations for components
export default function ProductCard({ product }: { product: IProduct }) {
  return <div>{product.name}</div>;
}

// ✅ Good - Named exports for reusable components
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

#### Props Interface
```typescript
// ✅ Good - Define props interface
interface ProductCardProps {
  product: IProduct;
  onAddToCart: (productId: string) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  // Component logic
}
```

### React Guidelines

#### Component Structure
```typescript
// ✅ Good component structure
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/_components/ui/button';
import { IProduct } from '@/types/product.interface';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // 1. Hooks
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 3. Event handlers
  const handleAddToCart = () => {
    setIsLoading(true);
    onAddToCart(product._id);
    setIsLoading(false);
  };
  
  // 4. Early returns
  if (!product) return null;
  
  // 5. Render
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <Button onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? 'در حال افزودن...' : 'افزودن به سبد'}
      </Button>
    </div>
  );
}
```

#### Hooks Usage
```typescript
// ✅ Good - Custom hook
export function useProduct(productId: string) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProduct(productId)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);
  
  return { product, loading, error };
}
```

### CSS/Tailwind Guidelines

#### Class Organization
```typescript
// ✅ Good - Group related classes
<div className={`
  // Layout
  flex items-center justify-between
  // Spacing
  p-4 mb-6
  // Colors
  bg-white text-gray-800
  // Effects
  shadow-lg rounded-lg
  // Responsive
  md:p-6 lg:mb-8
`}>
```

#### Conditional Classes
```typescript
// ✅ Good - Use classnames utility or similar
import classNames from 'classnames';

<Button 
  className={classNames(
    'px-4 py-2 rounded',
    {
      'bg-blue-500 text-white': variant === 'primary',
      'bg-gray-200 text-gray-800': variant === 'secondary',
      'opacity-50 cursor-not-allowed': disabled,
    }
  )}
/>
```

## 🔄 Git Workflow

### Branch Naming
- `feature/add-user-authentication`
- `fix/product-price-calculation`
- `hotfix/security-vulnerability`
- `refactor/api-error-handling`

### Commit Messages
```bash
# ✅ Good
feat: add user authentication system
fix: resolve product price calculation bug
docs: update API documentation
style: format code with prettier
refactor: simplify product service logic
test: add unit tests for user service

# ❌ Bad
update code
fix bug
changes
```

### Pull Request Guidelines
1. **Title**: Clear, descriptive title
2. **Description**: What changes were made and why
3. **Screenshots**: For UI changes
4. **Testing**: How to test the changes
5. **Breaking Changes**: Document any breaking changes

## 🧩 Component Guidelines

### Component Types
1. **UI Components**: Reusable, no business logic (`/app/_components/ui/`)
2. **Feature Components**: Business logic, specific to features
3. **Layout Components**: Page layouts and structure
4. **Page Components**: Route-specific components

### Props Guidelines
```typescript
// ✅ Good - Optional props with defaults
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick 
}: ButtonProps) {
  // Component logic
}
```

### Error Boundaries
```typescript
// ✅ Good - Use error boundaries for components
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h2>خطایی رخ داده است</h2>
      <p>{error.message}</p>
    </div>
  );
}

export function ProductList() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProductGrid />
    </ErrorBoundary>
  );
}
```

## 🌐 API Development

### Route Structure
```typescript
// ✅ Good - API route structure
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/configs/db';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    
    // Logic here
    
    return NextResponse.json({
      success: true,
      message: 'Data retrieved successfully',
      data: result
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error.message
      },
      { status: 500 }
    );
  }
}
```

### Error Handling
```typescript
// ✅ Good - Consistent error responses
export function handleApiError(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { success: false, message: 'Validation failed', errors: error.errors },
      { status: 422 }
    );
  }
  
  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { success: false, message: 'Resource not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(
    { success: false, message: 'Internal server error' },
    { status: 500 }
  );
}
```

### Request Validation
```typescript
// ✅ Good - Validate request data
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  description: z.string().max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createProductSchema.parse(body);
    
    // Process validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.errors },
        { status: 422 }
      );
    }
  }
}
```

## 🗄️ Database Guidelines

### Model Definitions
```typescript
// ✅ Good - Mongoose model with proper typing
import mongoose, { Document, Model } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true, maxlength: 100 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, maxlength: 1000 },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });

export const Product: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
```

### Query Guidelines
```typescript
// ✅ Good - Efficient queries with proper error handling
export async function getProducts(filters: ProductFilters) {
  try {
    const query = Product.find();
    
    // Apply filters
    if (filters.category) {
      query.where('category').equals(filters.category);
    }
    
    if (filters.priceRange) {
      query.where('price').gte(filters.priceRange.min).lte(filters.priceRange.max);
    }
    
    // Apply pagination
    const skip = (filters.page - 1) * filters.limit;
    query.skip(skip).limit(filters.limit);
    
    // Execute query
    const products = await query.exec();
    const total = await Product.countDocuments(query.getFilter());
    
    return {
      products,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit)
      }
    };
  } catch (error) {
    throw new DatabaseError('Failed to fetch products');
  }
}
```

## 🧪 Testing Guidelines

### Unit Testing
```typescript
// ✅ Good - Jest unit test
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    _id: '1',
    name: 'Test Product',
    price: 100000,
    description: 'Test Description'
  };
  
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100,000 تومان')).toBeInTheDocument();
  });
  
  it('calls onAddToCart when button is clicked', () => {
    const mockOnAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    fireEvent.click(screen.getByText('افزودن به سبد'));
    expect(mockOnAddToCart).toHaveBeenCalledWith('1');
  });
});
```

### API Testing
```typescript
// ✅ Good - API route testing
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/products/route';

describe('/api/products', () => {
  it('returns products successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data.products)).toBe(true);
  });
});
```

## ⚡ Performance Guidelines

### Component Optimization
```typescript
// ✅ Good - Memoization for expensive calculations
import { memo, useMemo } from 'react';

interface ProductListProps {
  products: IProduct[];
  filters: ProductFilters;
}

export const ProductList = memo(function ProductList({ products, filters }: ProductListProps) {
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Expensive filtering logic
      return product.name.includes(filters.search);
    });
  }, [products, filters.search]);
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
});
```

### Image Optimization
```typescript
// ✅ Good - Use Next.js Image component
import Image from 'next/image';

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={200}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      className="rounded-lg"
    />
  );
}
```

### Database Optimization
```typescript
// ✅ Good - Use lean queries when possible
const products = await Product.find(query)
  .select('name price image')  // Only select needed fields
  .lean()                      // Return plain objects instead of Mongoose documents
  .limit(20);
```

## 🔐 Security Guidelines

### Input Validation
```typescript
// ✅ Good - Always validate and sanitize input
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}
```

### Authentication
```typescript
// ✅ Good - Check authentication in API routes
import jwt from 'jsonwebtoken';

export async function authenticateRequest(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

### Environment Variables
```typescript
// ✅ Good - Validate environment variables at startup
export function validateEnvironmentVariables() {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}
```

## 📚 Additional Resources

### Useful Libraries
- **UI**: Headless UI, Radix UI
- **Forms**: React Hook Form, Zod
- **State**: Zustand, React Query
- **Styling**: Tailwind CSS, clsx
- **Testing**: Jest, React Testing Library
- **Validation**: Zod, Yup

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Code Quality Tools
```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

**Remember**: These guidelines are meant to ensure consistency, maintainability, and performance. Always consider the specific context of your task when applying these rules.