/**
 * Nguồn dữ liệu cho trang "Báo cáo số liệu kinh doanh" (bc-so-lieu-kd.html).
 *
 * Đây là chỗ DUY NHẤT chứa số liệu — trang HTML không còn số nào gán cứng nữa,
 * toàn bộ bảng được JS đọc từ đây rồi render ra.
 *
 * Khi có API thật, chỉ cần sửa hàm fetchBcSoLieuKD() bên dưới để gọi API thay vì
 * đọc từ object mock, miễn giữ đúng cấu trúc trả về là trang sẽ tự chạy đúng:
 *
 * {
 *   khuVuc: {
 *     rows: [{ id, label, soKH, soM3, doanhThu, phiBVMT, thue5, tong, soHoaDon }, ...],
 *     kyTruoc: { soKH, soM3, doanhThu, phiBVMT, thue5, tong, soHoaDon },
 *     delta:   { soKH, soM3, doanhThu, phiBVMT, thue5, tong, soHoaDon }  // số âm = giảm so với kỳ trước
 *   },
 *   doiTuong: { ...cùng cấu trúc như khuVuc... }
 * }
 *
 * "Tổng" ở dòng cuối bảng KHÔNG cần khai báo — được JS tự cộng từ các dòng rows.
 * Muốn thêm 1 khu vực / đối tượng mới: chỉ cần thêm 1 object vào mảng rows.
 * Muốn thêm 1 kỳ báo cáo mới (tháng khác): thêm 1 key "YYYY-MM" mới vào bcSoLieuKD bên dưới.
 */
window.PMW_REPORT_DATA = window.PMW_REPORT_DATA || {};

window.PMW_REPORT_DATA.bcSoLieuKD = {
  "2026-04": {
    khuVuc: {
      rows: [
        { id: 'xi-nghiep-cap-nuoc-vung-tau', label: 'Xí Nghiệp Cấp Nước Vũng Tàu', soKH: 32847, soM3: 891250, doanhThu: 15482300000, phiBVMT: 1032180000, thue5: 774115000, tong: 18938711000, soHoaDon: 38210 },
        { id: 'xi-nghiep-cap-nuoc-ba-ria', label: 'Xí Nghiệp Cấp nước Bà Rịa', soKH: 18923, soM3: 512880, doanhThu: 8934750000, phiBVMT: 595650000, thue5: 446737500, tong: 10926510000, soHoaDon: 22086 },
        { id: 'xi-nghiep-cap-nuoc-long-dien', label: 'Xí Nghiệp Cấp nước Long Điền', soKH: 9442, soM3: 258400, doanhThu: 4512300000, phiBVMT: 300820000, thue5: 225615000, tong: 5521080000, soHoaDon: 11120 },
        { id: 'chi-nhanh-cap-nuoc-xuyen-moc', label: 'Chi nhánh cấp nước Xuyên Mộc', soKH: 6287, soM3: 172350, doanhThu: 2981400000, phiBVMT: 198760000, thue5: 149070000, tong: 3649321200, soHoaDon: 7340 },
        { id: 'chi-nhanh-cap-nuoc-chau-duc', label: 'Chi nhánh cấp nước Châu Đức', soKH: 7156, soM3: 196720, doanhThu: 3412800000, phiBVMT: 227520000, thue5: 170640000, tong: 4163913600, soHoaDon: 8380 },
        { id: 'nuoc-ban-si-cho-phu-my', label: 'Nước bán sỉ cho Phú Mỹ', soKH: 2119, soM3: 74969, doanhThu: 1526417620, phiBVMT: 101760000, thue5: 76320000, tong: 1867855082, soHoaDon: 2940 }
      ],
      kyTruoc: { soKH: 207774, soM3: 5606569, doanhThu: 70849967620, phiBVMT: 3818217176, thue5: 3542498381, tong: 88713149781, soHoaDon: 192860 },
      delta: { soKH: 4127, soM3: 114681, doanhThu: 1998332380, phiBVMT: -379490176, thue5: 42617119, tong: 2354219882, soHoaDon: -2784 }
    },
    doiTuong: {
      rows: [
        { id: 'sinh-hoat-do-thi', label: 'Sinh hoạt đô thị', soKH: 32847, soM3: 901200, doanhThu: 15612300000, phiBVMT: 1040820000, thue5: 780615000, tong: 19015789000, soHoaDon: 38980 },
        { id: 'sinh-hoat-nong-thon', label: 'Sinh hoạt nông thôn', soKH: 14220, soM3: 380600, doanhThu: 6120540000, phiBVMT: 408036000, thue5: 306027000, tong: 7481442600, soHoaDon: 16820 },
        { id: 'dong-bao-dt', label: 'Đồng bào DT', soKH: 2438, soM3: 64300, doanhThu: 918480000, phiBVMT: 61231200, thue5: 45924000, tong: 1123734320, soHoaDon: 2690 },
        { id: 'co-quan', label: 'Cơ quan', soKH: 5874, soM3: 157820, doanhThu: 2728300000, phiBVMT: 181887000, thue5: 136415000, tong: 3335459600, soHoaDon: 7490 },
        { id: 'san-xuat', label: 'Sản xuất', soKH: 8312, soM3: 224800, doanhThu: 3914560000, phiBVMT: 260971000, thue5: 195728000, tong: 4787591800, soHoaDon: 10820 },
        { id: 'kinh-doanh', label: 'Kinh Doanh', soKH: 9740, soM3: 262900, doanhThu: 4572300000, phiBVMT: 304820000, thue5: 228615000, tong: 5589481400, soHoaDon: 12660 }
      ],
      kyTruoc: { soKH: 196228, soM3: 5296350, doanhThu: 64998070380, phiBVMT: 3431527000, thue5: 2586450000, tong: 77188130080, soHoaDon: 188640 },
      delta: { soKH: 3741, soM3: 98430, doanhThu: 1712410000, phiBVMT: -173761800, thue5: 93126000, tong: 853631660, soHoaDon: -9180 }
    }
  }
};

/**
 * "API" lấy dữ liệu theo kỳ (tháng/năm). Trả về Promise để sau này thay bằng gọi
 * API thật mà không cần sửa code render, ví dụ:
 *   return fetch(`/api/reports/bc-so-lieu-kd?month=${month}&year=${year}`).then(r => r.json());
 */
window.PMW_REPORT_DATA.fetchBcSoLieuKD = function fetchBcSoLieuKD(month, year) {
  const key = `${year}-${String(month).padStart(2, '0')}`;
  const data = window.PMW_REPORT_DATA.bcSoLieuKD[key] || null;
  return Promise.resolve(data);
};
