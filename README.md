# PMW refactor components v2

Bản này đã thay HTML lặp trong từng page bằng component placeholder:

```html
<div data-component="header"></div>
<div data-component="sidebar-report"></div>
<div data-component="sidebar-production"></div>
<div data-component="footer"></div>
```

## File component

- `components/header.html`: header dùng chung
- `components/footer.html`: footer dùng chung
- `components/sidebar-report.html`: sidebar cho nhóm báo cáo
- `components/sidebar-production.html`: sidebar cho trang Quản lý sản xuất
- `components/components-loader.js`: tự động nạp component vào page

## Lưu ý chạy thử

Không nên mở trực tiếp bằng `file://` vì trình duyệt có thể chặn load file HTML con.
Hãy chạy bằng Live Server trong VS Code hoặc đưa lên GitHub Pages.

Ví dụ local nhanh:

```bash
python3 -m http.server 8000
```

Sau đó mở `http://localhost:8000`.
