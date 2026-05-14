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


## v3 — Đã gắn link điều hướng
- Header logo: `index.html`
- Sidebar báo cáo: các mục con trỏ tới từng file báo cáo.
- Sidebar sản xuất: dashboard chính trỏ tới `quanly-sanxuat.html`, các mục phụ dùng hash để giữ trạng thái trong cùng trang.
- Index cards: đã gắn link vào từng card/module.
- Dashboard cards: đã gắn link tới báo cáo tương ứng hoặc query `?nav=` cho các mục phụ.


## v4 update
- Card / menu “Báo cáo số liệu nội bộ” trỏ trực tiếp tới `bc-so-lieu-kd.html`.

## Cập nhật v5
- Cập nhật style Login Form theo layout Figma: modal 860×520, cover 325×520, form 535×400, input 439×40, button 439×40.
- Di chuyển gạch accent xuống dưới subtitle giống thiết kế mẫu.
- Chuẩn hóa nút “Quay về trang chủ” không còn ký tự mũi tên.


## v6
- Thu nhỏ form login cho MacBook 14 inch và màn hình 1366×768.
- Giảm padding form từ 48px xuống 24px ở các breakpoint nhỏ.
- Giảm kích thước modal, cover, input và button để không bị quá lớn trên màn hình thấp.


## v8
- Compact KPI card typography and spacing for MacBook Pro 14 inch and 1366×768 screens.
