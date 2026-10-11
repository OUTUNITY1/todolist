# Todo App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-yellow)](#)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)](#)

Ứng dụng quản lý công việc **open source**, viết bằng **HTML + CSS + JavaScript thuần**, lưu dữ liệu trên **Firebase** (Auth + Realtime Database).

Không cần backend Node, không cần build step — clone về là chạy được.

---

## Demo tính năng

| Tính năng | Mô tả |
|-----------|--------|
| Đăng nhập | Email/Password hoặc Google (không có form đăng ký) |
| Todo CRUD | Thêm · Sửa · Xóa · Đánh dấu hoàn thành |
| Lọc | Tất cả / Đang làm / Hoàn thành |
| Realtime | Đồng bộ theo user qua Firebase Realtime Database |
| UI | Responsive, toast, animation nhẹ |

## Cấu trúc project

```
todo-app/
├── index.html          # Giao diện
├── styles.css          # Styles
├── app.js              # Logic + Firebase
├── assets/             # (icon, image…)
├── docs/
│   ├── ROADMAP.md      # Lộ trình tính năng
│   └── FIREBASE_RULES.md
├── CONTRIBUTING.md     # Hướng dẫn đóng góp
├── LICENSE             # MIT
├── .gitignore
└── README.md
```

## Chạy local

```bash
# Cách 1: Live Server (VS Code extension)
# Cách 2: Python
python -m http.server 5500

# Cách 3: Node
npx serve .
```

Mở `http://localhost:5500` (hoặc cổng tương ứng).

> Google login cần chạy qua `http://` hoặc `https://` (không dùng `file://`).

## Cấu hình Firebase

1. Tạo project trên [Firebase Console](https://console.firebase.google.com)
2. Bật **Authentication**:
   - Email/Password
   - Google
3. Tạo **Realtime Database** (chọn region phù hợp)
4. Dán config vào `app.js` (hoặc sau này tách file `config.js`)
5. Rules gợi ý — xem [docs/FIREBASE_RULES.md](docs/FIREBASE_RULES.md)

Vì app **không có đăng ký**, tạo user test trong Console → Authentication → Users → Add user.

## Roadmap & đóng góp

- Xem kế hoạch tính năng: [docs/ROADMAP.md](docs/ROADMAP.md)
- Muốn code cùng: [CONTRIBUTING.md](CONTRIBUTING.md)

Mọi PR đều được chào đón: bug fix, dark mode, due date, priority, drag-drop, PWA…

## Liên hệ

**lga775385@gmail.com**

## License

Phát hành dưới giấy phép [MIT](LICENSE) — tự do sử dụng, sửa đổi, phân phối.
