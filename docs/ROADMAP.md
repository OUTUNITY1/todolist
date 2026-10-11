# Roadmap – Todo App Open Source

Danh sách tính năng dự kiến. Ai cũng có thể claim và PR.

## Đã có (v1.0)

- [x] Đăng nhập Email / Google (Firebase Auth)
- [x] CRUD công việc (Realtime Database)
- [x] Lọc: Tất cả / Đang làm / Hoàn thành
- [x] Sửa inline title
- [x] Responsive UI
- [x] Toast thông báo

## Sắp tới (v1.x)

### Ưu tiên cao
- [ ] **Dark mode** (toggle + lưu preference)
- [ ] **Due date** (ngày hết hạn + highlight quá hạn)
- [ ] **Priority** (thấp / trung bình / cao)
- [ ] **Tìm kiếm** realtime theo tiêu đề
- [ ] **Kéo thả** sắp xếp thứ tự (drag & drop)

### Ưu tiên trung bình
- [ ] Tags / nhãn màu
- [ ] Sub-tasks (công việc con)
- [ ] Lọc theo priority / tag / due date
- [ ] Export JSON / CSV
- [ ] PWA (cài đặt như app, offline cơ bản)

### Ý tưởng dài hạn
- [ ] Chia sẻ list với người khác (collaborative)
- [ ] Thông báo nhắc việc (browser notification)
- [ ] Thống kê hoàn thành theo tuần/tháng
- [ ] Nhiều list / project
- [ ] Theme tùy chỉnh (màu primary)

## Ghi chú

- Ưu tiên giữ **vanilla JS** để dễ tiếp cận người mới.
- Nếu thêm thư viện (SortableJS, date-fns…), ghi rõ trong PR và README.
- Cập nhật file này khi merge tính năng mới.
