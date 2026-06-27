# Student overview redesign

Thu muc nay chua ban Student shell moi theo style `teacher-overview.html`.
CSS da copy lai token mau, font Plus Jakarta Sans + Inter, shadow, radius,
topbar, drawer, dock, KPI, panel va icon line-style tu file teacher.

## Structure

- `index.html`: muc luc preview, khong chua noi dung tung trang.
- `pages/overview.html`: trang Tong quan.
- `pages/schedule.html`: trang Lich hoc.
- `pages/assignments.html`: trang Bai tap.
- `pages/resources.html`: trang Tai lieu.
- `pages/discussion.html`: trang Trao doi.
- `styles/tokens.css`: font, mau, radius, shadow lay theo `teacher-overview.html`.
- `styles/shell.css`: topbar, search, profile, drawer lop, dock.
- `styles/components.css`: KPI, panel, cards, table, filter, sticky note.
- `styles/pages.css`: layout rieng cho lich, chat va responsive.
- `styles/modals.css`: popup tham gia lop, hoc phi va chi tiet buoi hoc.
- `scripts/icons.js`: bo icon SVG line-style.
- `scripts/app.js`: active nav, open/close drawer/modal.
- `StudentNotebookWorkspace.tsx`: ban React tham khao.
- `StudentNotebookWorkspace.css`: CSS React cu, giu lai de doi chieu.

## Ghi chu

Ban React dang dung lai data/content tu `src_huy/features/student/notebook`.
Popup mo bang `data-modal-target="ten-popup"` va noi dung popup dung `data-modal="ten-popup"`.
Neu muon gan vao app, copy 2 file nay vao:

`src_huy/features/student/notebook/`
