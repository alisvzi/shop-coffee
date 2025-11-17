# API Documentation - Coffee Shop Project

## Base URL
```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

## Authentication Endpoints

### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "احمد محمدی",
  "email": "ahmad@example.com",
  "password": "securePassword123",
  "phone": "09123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "حساب کاربری با موفقیت ایجاد شد",
  "data": {
    "user": {
      "id": "user_id",
      "name": "احمد محمدی",
      "email": "ahmad@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /api/auth/signin
Login with existing credentials.

**Request Body:**
```json
{
  "email": "ahmad@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "با موفقیت وارد شدید",
  "data": {
    "user": {
      "id": "user_id",
      "name": "احمد محمدی",
      "email": "ahmad@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /api/auth/verify
Verify user account (if verification is implemented).

**Request Body:**
```json
{
  "email": "ahmad@example.com",
  "verificationCode": "123456"
}
```

## Product Endpoints

### GET /api/products
Get all products with optional filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12, max: 100)
- `category` (optional): Filter by category
- `search` (optional): Search in product names
- `sort` (optional): Sort by 'name', 'price', 'createdAt' (default: 'createdAt')
- `order` (optional): 'asc' or 'desc' (default: 'desc')

**Example:**
```
GET /api/products?page=1&limit=10&search=اسپرسو&sort=price&order=asc
```

**Response:**
```json
{
  "success": true,
  "message": "محصولات با موفقیت دریافت شدند",
  "data": {
    "products": [
      {
        "_id": "product_id",
        "name": "قهوه اسپرسو ممتاز",
        "price": 250000,
        "shortDesc": "قهوه اسپرسوی درجه یک",
        "longDesc": "توضیحات کامل محصول...",
        "weight": 250,
        "suitableFor": "اسپرسو، موکا",
        "smell": "شکلاتی، میوه‌ای",
        "score": 4.5,
        "img": "/images/espresso-1.jpg",
        "tags": ["اسپرسو", "ممتاز", "تلخ"],
        "comments": []
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /api/products/[id]
Get a specific product by ID.

**Response:**
```json
{
  "success": true,
  "message": "محصول با موفقیت دریافت شد",
  "data": {
    "product": {
      "_id": "product_id",
      "name": "قهوه اسپرسو ممتاز",
      "price": 250000,
      "shortDesc": "قهوه اسپرسوی درجه یک",
      "longDesc": "توضیحات کامل محصول...",
      "weight": 250,
      "suitableFor": "اسپرسو، موکا",
      "smell": "شکلاتی، میوه‌ای",
      "score": 4.5,
      "img": "/images/espresso-1.jpg",
      "tags": ["اسپرسو", "ممتاز", "تلخ"],
      "comments": ["comment_id_1", "comment_id_2"]
    }
  }
}
```

### POST /api/products
Create a new product (Admin only).

**Headers Required:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "name": "قهوه اسپرسو جدید",
  "price": 300000,
  "shortDesc": "قهوه اسپرسوی فوق‌العاده",
  "longDesc": "توضیحات کامل محصول جدید...",
  "weight": 250,
  "suitableFor": "اسپرسو، موکا، فیلتر",
  "smell": "شکلاتی، کارامل",
  "img": "/images/new-espresso.jpg",
  "tags": ["اسپرسو", "جدید", "ممتاز"]
}
```

### PUT /api/products/[id]
Update a product (Admin only).

**Headers Required:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:** Same as POST /api/products

### DELETE /api/products/[id]
Delete a product (Admin only).

**Headers Required:**
```
Authorization: Bearer <admin_jwt_token>
```

## Comments Endpoints

### GET /api/comments
Get comments for a specific product.

**Query Parameters:**
- `productId` (required): Product ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /api/comments?productId=product_id&page=1&limit=5
```

**Response:**
```json
{
  "success": true,
  "message": "نظرات با موفقیت دریافت شدند",
  "data": {
    "comments": [
      {
        "_id": "comment_id",
        "user": {
          "_id": "user_id",
          "name": "احمد محمدی"
        },
        "product": "product_id",
        "body": "قهوه فوق‌العاده‌ای بود، توصیه می‌کنم",
        "score": 5,
        "isAccepted": true,
        "createdAt": "2024-01-01T12:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25
    }
  }
}
```

### POST /api/comments
Add a new comment (Authenticated users only).

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Request Body:**
```json
{
  "productId": "product_id",
  "body": "نظر من در مورد این محصول",
  "score": 4
}
```

### PUT /api/comments/[id]
Update a comment (Comment owner or Admin only).

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Request Body:**
```json
{
  "body": "نظر ویرایش شده",
  "score": 5
}
```

### DELETE /api/comments/[id]
Delete a comment (Comment owner or Admin only).

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

## User Management Endpoints

### GET /api/user/profile
Get current user's profile.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "اطلاعات کاربر با موفقیت دریافت شد",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "احمد محمدی",
      "email": "ahmad@example.com",
      "phone": "09123456789",
      "role": "user",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  }
}
```

### PUT /api/user/profile
Update current user's profile.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Request Body:**
```json
{
  "name": "احمد محمدی",
  "phone": "09123456789"
}
```

## Wishlist Endpoints

### GET /api/wishlist
Get user's wishlist.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "علاقه‌مندی‌ها با موفقیت دریافت شدند",
  "data": {
    "wishlist": {
      "_id": "wishlist_id",
      "user": "user_id",
      "products": [
        {
          "_id": "product_id",
          "name": "قهوه اسپرسو ممتاز",
          "price": 250000,
          "img": "/images/espresso-1.jpg"
        }
      ]
    }
  }
}
```

### POST /api/wishlist
Add product to wishlist.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Request Body:**
```json
{
  "productId": "product_id"
}
```

### DELETE /api/wishlist/[productId]
Remove product from wishlist.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

## Contact Endpoints

### POST /api/contact
Send a contact message.

**Request Body:**
```json
{
  "name": "احمد محمدی",
  "email": "ahmad@example.com",
  "phone": "09123456789",
  "subject": "موضوع پیام",
  "message": "متن پیام..."
}
```

## Ticket System Endpoints

### GET /api/tickets
Get user's support tickets.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Query Parameters:**
- `status` (optional): Filter by status ('open', 'closed', 'pending')
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

### POST /api/tickets
Create a new support ticket.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Request Body:**
```json
{
  "title": "موضوع تیکت",
  "body": "متن تیکت...",
  "department": "department_id",
  "priority": "medium"
}
```

### GET /api/tickets/[id]
Get a specific ticket.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

### POST /api/tickets/[id]/reply
Reply to a ticket.

**Headers Required:**
```
Authorization: Bearer <user_jwt_token>
```

**Request Body:**
```json
{
  "body": "پاسخ به تیکت..."
}
```

## Department Endpoints

### GET /api/departments
Get all departments (for ticket system).

**Response:**
```json
{
  "success": true,
  "message": "دپارتمان‌ها با موفقیت دریافت شدند",
  "data": {
    "departments": [
      {
        "_id": "dept_id",
        "title": "پشتیبانی فنی",
        "description": "مسائل فنی و تخصصی"
      }
    ]
  }
}
```

## Discount Endpoints

### GET /api/discounts
Get active discounts (Admin only).

**Headers Required:**
```
Authorization: Bearer <admin_jwt_token>
```

### POST /api/discounts
Create a new discount (Admin only).

**Headers Required:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "code": "SUMMER2024",
  "percent": 20,
  "maxUse": 100,
  "expireAt": "2024-08-31T23:59:59Z"
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP

## Notes

1. All dates are returned in ISO 8601 format (UTC)
2. Prices are in Iranian Rial (IRR)
3. File uploads should use multipart/form-data
4. All Persian text should be properly encoded in UTF-8
5. Boolean fields accept `true`, `false`, `1`, or `0`
6. Product weights are in grams
7. Scores/ratings are from 1-5 scale

## Example Usage with JavaScript

```javascript
// Login example
const loginUser = async (email, password) => {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      return data.data.user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Get products with authentication
const getProducts = async (page = 1, limit = 12) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`/api/products?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    
    const data = await response.json();
    return data.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
```
