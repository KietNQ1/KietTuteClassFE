# Teacher overview redesign

Thư mục này chứa bản Teacher shell theo cấu trúc modular giống `student-overview-redesign`.

## Structure

- `index.html`: mục lục preview, không chứa nội dung từng trang.
- `pages/overview.html`: trang Tổng quan lớp.
- `pages/calendar.html`: trang Lịch dạy.
- `styles/tokens.css`: font, màu, radius, shadow.
- `styles/shell.css`: topbar, search, profile, drawer lớp, dock.
- `styles/components.css`: KPI, panel, grid (trang tổng quan).
- `styles/calendar.css`: layout lịch tuần/tháng, sidebar stats.
- `styles/modals.css`: popup buổi học, điểm danh, danh sách buổi theo ngày.
- `styles/pages.css`: import tất cả stylesheet trên.
- `scripts/app.js`: drawer, active nav, chọn lớp dùng chung.
- `scripts/overview.js`: logic riêng trang tổng quan.
- `scripts/calendar.js`: logic riêng trang lịch dạy.

## Legacy

- `teacher-overview.html` và `teacher-calendar.html` là bản monolithic cũ (redirect sang `pages/`).
