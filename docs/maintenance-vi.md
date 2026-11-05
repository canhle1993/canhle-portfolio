# Lê Văn Cảnh — Portfolio

Website tĩnh viết bằng HTML, CSS và JavaScript thuần. Không cần Node.js, npm hay bước build, cũng không dùng framework CSS.

## Mở website

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy trong thư mục này:

```bash
python3 -m http.server 8000
```

rồi vào http://localhost:8000.

Giao diện kính mờ trên nền xám tím. Font Be Vietnam Pro tải từ Google Fonts, logo công nghệ tải từ jsDelivr (Devicon), nên cần Internet. Khi không có mạng, trang dùng font hệ thống và mục công nghệ chỉ còn chữ.

## Ba ngôn ngữ

Mặc định là tiếng Anh. Người xem chuyển bằng nút EN / VI / JA trên thanh đầu trang, và lựa chọn được lưu trên trình duyệt của họ. Link `?lang=vi` mở thẳng bản tiếng Việt, `?lang=ja` mở thẳng bản tiếng Nhật.

- **`index.html`:** chữ tiếng Anh nằm trong thẻ, tiếng Việt ở `data-vi`, tiếng Nhật ở `data-ja` ngay trên thẻ đó. Thuộc tính dùng cặp `data-vi-…` / `data-ja-…` (ví dụ `data-ja-alt`, `data-ja-aria-label`, `data-ja-placeholder`).
- **`assets/script.js`:** chữ nhiều ngôn ngữ viết dạng `{ en: '...', vi: '...', ja: '...' }`. Thiếu bản nào thì site tự hiện tiếng Anh. Chữ giống nhau ở mọi ngôn ngữ, như tên công nghệ, viết thẳng là được.
- **Khi sửa nội dung:** nhớ sửa cả ba bản.
- **Ảnh có chữ:** `project-caption-en.webp` dùng cho tiếng Anh và tiếng Nhật, `project-caption.webp` cho tiếng Việt. `og.jpg` chỉ có tiếng Anh.
- **Bài báo:** bài gốc đều bằng tiếng Việt; `title.vi` giữ đúng tiêu đề gốc, `title.en` và `title.ja` là bản dịch.
- **Font tiếng Nhật:** dùng font có sẵn trên máy người xem (Hiragino, Yu Gothic, Meiryo, Noto Sans JP).

## Cấu trúc

- `index.html`: đầu trang, giới thiệu, kỹ năng, hành trình, thành tích, khoảnh khắc, liên hệ.
- `assets/script.js`: danh sách `projects` và `press` ở đầu file, cùng các tương tác.
- `assets/style.css`: toàn bộ giao diện. Màu và font nằm trong `:root` ở đầu file.
- `assets/img/`: ảnh đã nén dùng trên site. `avatar-cutout.webp` là chân dung đã tách nền, `og.jpg` là ảnh hiện ra khi chia sẻ link.
- `assets/Le-Van-Canh-CV.pdf`: CV để tải về. Thay file mới thì giữ nguyên tên này.
- `photo/`, `bao-chi/`, `Chứng nhận/`: ảnh và tài liệu gốc, site không dùng trực tiếp. Ảnh chứng nhận đã nén nằm ở `assets/img/cert/`.

## Đang chạy ở đâu

- **GitHub Pages:** https://canhle1993.github.io/canhle-portfolio/ (repo `canhle1993/canhle-portfolio`, nhánh `main`). Mỗi lần push lên `main`, site tự cập nhật sau khoảng 1 phút.
- **Gắn tên miền `canhle.dev` sau này:**
  1. Ở nhà cung cấp tên miền, tạo 4 bản ghi `A` cho `@` trỏ về `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, và bản ghi `CNAME` cho `www` trỏ về `canhle1993.github.io`.
  2. Trong repo vào Settings > Pages > Custom domain, nhập `canhle.dev`, đợi kiểm tra DNS xong thì bật Enforce HTTPS.
  3. Các link `canonical`, `og:url`, `og:image` trong `index.html` đã trỏ sẵn tới `https://canhle.dev/`, nên ảnh xem trước khi chia sẻ link sẽ hiện đúng sau khi gắn tên miền.

## Khi đưa lên server

Chỉ cần đưa `index.html` và thư mục `assets/`. Đừng đưa `photo/` (có bảng điểm scan), `bao-chi/`, `Chứng nhận/`, các thư mục `.backup-*`, `.claude/` và `tai-lieu-tham-khao.rtf`.

Nếu demo ShopE chạy ở `canhle.dev/shop-e`, cấu hình server phải giữ đường dẫn này khi đặt portfolio ở thư mục gốc.

## Cập nhật nội dung

**Thêm hoặc sửa dự án:** sửa `projects` trong `assets/script.js`. Link nào chưa có thì bỏ trống, nút tương ứng tự ẩn. Thẻ hiện theo thứ tự trong danh sách, trên lưới 3 cột. `wide: true` cho thẻ rộng gấp đôi; hiện có 2 thẻ rộng và 5 thẻ thường nên lưới vừa khít, thêm hoặc bớt dự án thì chỉnh lại `wide` để không bị lẻ ô. `map` thay ảnh bằng số liệu và sơ đồ, `itemsTitle` đổi tiêu đề danh sách trong chi tiết dự án, `results` thêm bảng kết quả.

**Thêm bài báo:** thêm một mục vào `press` trong `assets/script.js`, ghi đúng tiêu đề và ngày đăng của bài gốc (`date` viết dạng `2026-10-28`, site tự đổi theo ngôn ngữ). Bài báo hiện thành dải cuộn ngang theo thứ tự trong danh sách. Ảnh nên có tỉ lệ 3:2; không có ảnh thì bỏ trống `image`.

**Thêm ảnh:** nén về WebP rộng tối đa khoảng 1600 px, đặt vào `assets/img/`, tên không dấu và viết thường.

**Thêm chứng nhận:** nén ảnh về WebP vào `assets/img/cert/`, rồi chép một thẻ `<li>` trong mục `#certificates` của `index.html` và sửa ảnh, tên, ngày ở cả hai ngôn ngữ. Dải tự nhân đôi và tự chỉnh tốc độ.

**Form liên hệ:** gửi qua Web3Forms (gói Free, 250 tin mỗi tháng), tin nhắn về thẳng `aplevancanh1993@gmail.com`. Access key nằm trong ô ẩn `access_key` của form trong `index.html`; đổi email nhận hoặc xem tin đã gửi tại app.web3forms.com.

**Khôi phục thiết kế xanh lá và vàng:** bản đó nằm trong `.backup-thiet-ke-xanh-vang/`.

## Việc còn chờ bổ sung

- **ShopE, live demo:** `canhle.dev` chưa trỏ DNS nên nút demo đang tắt. Khi sẵn sàng, bỏ comment dòng `live` của dự án `shope` trong `assets/script.js`. Nút GitHub đã trỏ tới `ShopE-showcase`.
- **Đồ án AI, GitHub:** repo `image_caption_model` đang private nên chưa có nút GitHub. Khi public hoặc có repo showcase, thêm `github` vào dự án `caption` trong `assets/script.js`.
- **LinkedIn:** thêm một dòng vào `.contact-list` trong `index.html`.
- **Tên miền:** `canonical` và `og:image` trong `index.html` đang trỏ tới `https://canhle.dev/`. Đổi nếu dùng tên miền khác.
