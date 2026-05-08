# PlantDoctor - Trợ lý chăm sóc cây cảnh cho mùa hè Việt Nam

PlantDoctor là ứng dụng web giúp người dùng Việt Nam chăm cây cảnh dễ hơn trong thời tiết nóng ẩm, mưa thất thường và điều kiện sống đô thị.

Sản phẩm tập trung vào 3 nhu cầu thực tế:

1. Nhớ lịch chăm sóc hằng ngày để không quên tưới nước, bón phân.
2. Nhận diện nhanh vấn đề của cây qua hình ảnh và triệu chứng.
3. Mua đúng vật tư, cây cảnh phù hợp với mùa hè và khu vực giao hàng.

---

## 1) Tầm nhìn sản phẩm

PlantDoctor hướng đến một trải nghiệm "dễ dùng cho mọi nhà":

- Nhanh: mở app là thấy ngay tình trạng vườn.
- Đơn giản: ngôn ngữ gần gũi, thao tác ngắn gọn.
- Thực dụng: ưu tiên các gợi ý có thể làm ngay tại nhà.
- Bản địa hóa: dữ liệu, gợi ý và danh mục sản phẩm sát với thị trường Việt Nam.

---

## 2) Đối tượng người dùng

### Người dùng chính
- Người mới bắt đầu chơi cây cảnh tại nhà/chung cư.
- Nhân viên văn phòng, người bận rộn không có nhiều thời gian.
- Gia đình trẻ muốn tạo không gian xanh, dễ chăm.

### Nhu cầu phổ biến
- Cây héo lá, vàng lá nhưng không rõ lý do.
- Quên lịch tưới vào ngày nắng nóng.
- Không biết mua cây/phân bón nào hợp với thời tiết hè.

---

## 3) Giá trị nổi bật

- **Tổng quan thông minh:** xem nhanh sức khỏe vườn, bài đăng cộng đồng, cảnh báo.
- **Chẩn đoán AI (mô phỏng):** hướng dẫn xử lý triệu chứng theo mức ưu tiên.
- **Dự báo thời tiết cho cây:** kết hợp nhiệt độ, độ ẩm, gió để đưa ra hành động.
- **Bản đồ cộng đồng Hà Nội:** xem người dùng quanh bạn trên OpenStreetMap, marker avatar, cụm marker theo zoom, chạm để nhắn tin trao đổi.
- **Cửa hàng mùa hè Việt Nam:** lọc theo danh mục, khu vực giao, và khoảng giá.
- **Giỏ hàng và thanh toán:** thêm/xóa/sửa số lượng, tính tổng tiền rõ ràng.
- **Vườn của tôi:** quản lý cây dễ sống mùa hè, phù hợp thói quen người dân.

---

## 4) Tính năng theo màn hình

## Dashboard (Tổng quan)
- Hiển thị thông tin tài khoản và thống kê nhanh.
- Banner hành động chẩn đoán nhanh.
- Feed bài viết cộng đồng.
- Tiêu điểm thị trường với sản phẩm gợi ý.

## Diagnostic (Bác sĩ)
- Chọn ảnh/mô tả triệu chứng.
- Xem kết quả chẩn đoán, nguyên nhân khả nghi.
- Đề xuất hành động và lịch theo dõi.

## Weather (Thời tiết)
- Hero thời tiết hiện tại và dự báo.
- Danh sách hành động ưu tiên theo điều kiện môi trường.
- Gợi ý "làm ngay" để giảm rủi ro cho cây.

## Community Map (Bản đồ cộng đồng)
- Tích hợp nền bản đồ thật bằng OpenStreetMap.
- Hiển thị avatar người dùng quanh bạn tại Hà Nội.
- Tự gom cụm marker theo mức zoom để nhìn dễ hơn.
- Chạm vào marker để xem nhanh hồ sơ và nhắn tin liên lạc.
- Dữ liệu mock hiện tại gồm 3 người dùng: Bạn, Minh Quân, Ngọc Anh.

## Market (Cửa hàng)
- Lọc theo danh mục.
- Lọc theo khu vực giao hàng (Bắc/Trung/Nam).
- **Lọc khoảng giá từ-đến** bằng thanh kéo.
- Thêm vào giỏ hàng với phản hồi trực quan.

## My Plants (Vườn của tôi)
- Danh sách các cây phù hợp mùa hè Việt Nam.
- Thể hiện trạng thái và công việc chăm sóc tiếp theo.
- Xem chi tiết hồ sơ, lịch sử chăm sóc, lịch nhắc.

## Checkout
- Xem lại sản phẩm, số lượng, tổng tiền.
- Điền thông tin nhận hàng và hoàn tất đơn.

---

## 5) Định hướng nội dung "tiếp cận người dân"

Dữ liệu hiện tại được điều chỉnh để gần với bối cảnh sống tại Việt Nam:

- Lựa chọn cây dễ sống trong mùa hè: trầu bà, dừa cạn, sen đá, hoa giấy.
- Vị trí đặt cây thực tế: ban công, hiên nhà, bệ cửa sổ, cổng trước nhà.
- Văn phong giao tiếp đơn giản, dễ hiểu, tránh thuật ngữ khó.

Mục tiêu là giúp người dùng cảm thấy "đây là app cho mình", không phải một mẫu demo kỹ thuật.

---

## 6) Cấu trúc dự án (tóm tắt)

- `src/App.tsx`: dữ liệu mock chính + điều hướng tab.
- `src/components/`: toàn bộ màn hình và component UI.
- `src/components/CommunityMapView.tsx`: màn bản đồ cộng đồng (Leaflet + marker avatar + clustering mock).
- `src/types.ts`: định nghĩa kiểu dữ liệu.
- `public/images/`: ảnh local thay cho ảnh demo online.
- `public/images/README.md`: danh sách tên file ảnh cần thay.

---

## 7) Quản lý ảnh giao diện

Ứng dụng đã chuyển sang dùng đường dẫn ảnh local dạng:

- `/images/plants/...`
- `/images/products/...`
- `/images/community/...`
- `/images/dashboard/...`
- `/images/weather/...`

Để thay ảnh:
1. Đặt file mới vào đúng thư mục trong `public/images`.
2. Đặt đúng tên file theo hướng dẫn trong `public/images/README.md`.
3. Reload app là thay đổi hiển thị ngay.

---

## 8) Chạy dự án

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

Thư viện bản đồ đang dùng:
- `leaflet`
- `react-leaflet`

---

## 9) Lộ trình gợi ý tiếp theo

- Thêm fallback image khi thiếu file ảnh.
- Thêm bộ lọc nâng cao cho cửa hàng (sắp xếp theo giá, đánh giá).
- Kết nối API thời tiết thật.
- Kết nối backend giỏ hàng và đơn hàng.
- Thêm lưu trữ lịch sử chăm sóc theo tài khoản người dùng.

---

## 10) Ghi chú

Đây là phiên bản frontend mô phỏng luồng nghiệp vụ để thử nghiệm trải nghiệm người dùng.
Mục tiêu ưu tiên: rõ ràng, thân thiện, dễ mở rộng sang bản có dữ liệu thật.
