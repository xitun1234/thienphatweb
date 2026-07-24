# Xưởng Gia Dụng Thiên Phát — Website

Website giới thiệu năng lực sản xuất của Xưởng Gia Dụng Thiên Phát, phục vụ khách hàng sỉ, đại lý, nhà phân phối và đối tác OEM/ODM.

## Công nghệ

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animation nhẹ)
- Lucide React (icon)
- React Router

## Cài đặt và chạy

```bash
npm install
npm run dev        # Chạy development server
npm run build      # Build production
npm run preview    # Xem bản production build
```

## Cấu trúc thư mục

```
src/
├── assets/images/          # Ảnh placeholder (thay bằng ảnh thật)
├── components/
│   ├── common/             # SectionLabel, Button, ResponsiveImage, Accordion
│   ├── forms/              # QuoteForm
│   ├── layout/             # Header, Footer, Container, MobileMenu
│   └── sections/           # Hero, About, Statistics, Product, Capability,
│                           # Process, Quality, Gallery, OEM, Partnership, Quote
├── data/siteContent.js     # TOÀN BỘ NỘI DUNG VÀ DỮ LIỆU WEBSITE
├── hooks/                  # useScrollSpy, useLockBodyScroll
├── services/quoteService.js # API service cho form liên hệ
├── styles/globals.css      # Design tokens và global styles
├── App.jsx
└── main.jsx
```

## Hướng dẫn thay nội dung

### Thay tên thương hiệu
Sửa trong `src/data/siteContent.js`:
- `companyInfo.brandName` — tên viết tắt (hiển thị trên navbar)
- `companyInfo.fullName` — tên đầy đủ
- `companyInfo.tagline` — tagline footer

### Thay số điện thoại, email, địa chỉ
Sửa trong `src/data/siteContent.js`:
- `contactInfo.phone`
- `contactInfo.email`
- `contactInfo.address`
- `contactInfo.workingHours`

### Thay số liệu
Sửa mảng `statistics` trong `src/data/siteContent.js`:
- Thay `[SỐ NĂM]+`, `[SẢN LƯỢNG]`, `[SỐ NHÓM]` bằng số liệu thực

### Thay danh mục sản phẩm
Sửa mảng `productCategories` trong `src/data/siteContent.js`

### Thay ảnh
Tất cả ảnh placeholder hiện đang là file SVG trong `src/assets/images/`.
Thay bằng ảnh thật (định dạng .webp hoặc .jpg), sau đó cập nhật đường dẫn trong `src/data/siteContent.js`.

Danh sách ảnh cần thay:

| File hiện tại | Kích thước đề xuất | Mô tả |
|---|---|---|
| factory-hero.svg | 1440×960px | Ảnh toàn cảnh nhà xưởng (Hero) |
| factory-overview.svg | 1200×800px | Ảnh tổng quan xưởng (About) |
| production-line.svg | 1200×800px | Dây chuyền sản xuất (Capability) |
| quality-check.svg | 800×600px | Khu vực kiểm tra chất lượng |
| packing-area.svg | 800×600px | Khu vực đóng gói |
| workshop-detail.svg | 800×600px | Công nhân trong xưởng |
| product-kitchen.svg | 800×600px | Dụng cụ nhà bếp |
| product-cleaning.svg | 800×600px | Dụng cụ vệ sinh |
| product-storage.svg | 800×600px | Sản phẩm lưu trữ |
| product-accessories.svg | 800×600px | Phụ kiện gia dụng |
| product-garden.svg | 800×600px | Dụng cụ làm vườn |

### Tích hợp API gửi form
Mở `src/services/quoteService.js` và thay thế nội dung hàm `submitQuoteRequest()`:

```js
export async function submitQuoteRequest(payload) {
  const response = await fetch('https://your-api.com/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Gửi yêu cầu thất bại.');
  return await response.json();
}
```

### Thay favicon
Thay file `public/favicon.svg` bằng favicon thật của xưởng.

### Thay SEO metadata
Sửa trong `index.html`:
- `<title>`
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- `<link rel="canonical">`
- JSON-LD structured data (phone, address, url)

## Ghi chú

- Website hiện chạy hoàn toàn ở frontend, không cần backend.
- Tất cả dữ liệu placeholder được đánh dấu bằng `[DẤU NGOẶC VUÔNG]`.
- Không có dữ liệu thật nào bị bịa ra — chủ website tự điền.
