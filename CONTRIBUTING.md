# Đóng góp (Contributing)

Cảm ơn bạn muốn đóng góp cho **Todo App**!

## Cách bắt đầu

1. **Fork** repo này
2. Clone về máy:
   ```bash
   git clone https://github.com/YOUR_USERNAME/todo-app.git
   cd todo-app
   ```
3. Tạo branch mới:
   ```bash
   git checkout -b feature/ten-tinh-nang
   ```
4. Chạy app (Live Server hoặc bất kỳ static server):
   ```bash
   # Ví dụ với Python
   python -m http.server 5500
   # hoặc npx serve .
   ```
5. Sửa code → test → commit → push → mở **Pull Request**

## Quy ước code

- Dùng **vanilla HTML / CSS / JS** (không bắt buộc framework trừ khi PR đề xuất rõ)
- Tên biến / hàm: `camelCase`
- Comment bằng tiếng Việt hoặc tiếng Anh đều được, ưu tiên rõ ràng
- Không commit file chứa secret (API key riêng, service account…)
- Firebase config demo có thể giữ trong repo; production nên dùng biến môi trường / config riêng

## Loại đóng góp được chào đón

| Loại | Ví dụ |
|------|--------|
| Bug fix | Sửa lỗi UI, auth, realtime sync |
| Feature | Dark mode, priority, due date, tags… |
| Docs | README, hướng dẫn deploy, dịch thuật |
| Refactor | Tách module, cải thiện performance |
| Design | UI/UX, accessibility (a11y) |

## Pull Request

- Mô tả rõ **vấn đề** và **cách giải quyết**
- Screenshot / GIF nếu thay đổi giao diện
- Đảm bảo app vẫn chạy được với Firebase demo (hoặc ghi rõ cần config gì)

## Liên hệ

Có ý tưởng lớn hoặc cần thảo luận? Gửi email: **lga775385@gmail.com**
