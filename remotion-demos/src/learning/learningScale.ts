/** Layout spacing (padding, gap, width) — giữ scale cũ */
export const LAYOUT = 2;
/** Cỡ chữ — gấp đôi so với trước (TEXT = LAYOUT × 2) */
export const TEXT = 4;

export const fl = (n: number) => n * LAYOUT;
export const ft = (n: number) => n * TEXT;

/** Cuộn để hiện trọn câu 3 (tỷ lệ với chiều cao nội dung) */
export const ESSAY_SCROLL_Y = 720;
