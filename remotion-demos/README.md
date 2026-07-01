# TuteClass Solution Demos (Remotion)

Hoạt ảnh demo cho 3 ô **Solution** trên `index.html`.

## Compositions

| ID | File output | Mô tả |
|----|-------------|--------|
| `SolutionCalendar` | `../demos/solution-calendar.mp4` | Lịch dạy → chi tiết buổi → điểm danh |
| `SolutionLearning` | `../demos/solution-learning.mp4` | Danh sách bài tập → thống kê nộp/chấm |
| `SolutionAI` | `../demos/solution-ai.mp4` | Chat AI tạo câu hỏi trắc nghiệm |

## Cài đặt

```bash
cd remotion-demos
npm install
```

## Xem / chỉnh trong Remotion Studio

```bash
npm start
```

## Render video (sau khi chỉnh xong)

```bash
npm run build:all
```

Hoặc từng clip:

```bash
npm run build:calendar
npm run build:learning
npm run build:ai
```

Video xuất ra thư mục `demos/` ở root repo, được `index.html` nhúng qua thẻ `<video>`.

## Ghi chú

- Kích thước: **960×540**, **8 giây**, **30 fps**
- Palette tham chiếu LamUI: kem `#fffaf1`, navy `#0b2f66`, cam `#ff5c00`
- Cần cài Chrome/Chromium để Remotion render (tự tải lần đầu)
