# 🚀 Research: Cocos Creator Engine Fundamentals

## I. CHU KỲ VÒNG ĐỜI (COMPONENT LIFE CYCLE)

Hệ thống vòng đời (Life Cycle) của Cocos Creator quản lý cách một script tương tác với Engine từ lúc được sinh ra đến khi bị tiêu hủy. Việc nắm rõ thứ tự thực thi là chìa khóa để tránh các lỗi về `null reference` hoặc rò rỉ bộ nhớ.

### 1. Giai đoạn Khởi tạo & Kích hoạt (Initialization Phase)

- `onLoad`:

    - **Cơ chế**: Được gọi ngay khi Node chứa Component được khởi tạo (khi Scene load hoặc dùng `instantiate`).

    - **Phân tích sâu**: Đây là thời điểm an toàn nhất để truy xuất các Node con hoặc các Component khác trên cùng một Node. Tuy nhiên, không nên truy xuất dữ liệu từ các Node khác ở xa vì có thể chúng chưa chạy `onLoad`.

- `onEnable`:

    - **Cơ chế**: Gọi khi thuộc tính `active` chuyển từ `false` sang `true`.

    - **Khác biệt**: Khác với `onLoad`, tại `start`, tất cả các Component khác trong Scene chắc chắn đã chạy xong `onLoad`, giúp việc trao đổi dữ liệu giữa các đối tượng an toàn hơn.

- `start`:

    - **Cơ chế**: Chỉ gọi một lần duy nhất trước khi hàm `update` đầu tiên bắt đầu.

    - **Khác biệt**: Khác với `onLoad`, tại `start`, tất cả các Component khác trong Scene chắc chắn đã chạy xong `onLoad`, giúp việc trao đổi dữ liệu giữa các đối tượng an toàn hơn.

### 2. Giai đoạn Thực thi & Cập nhật (Update Phase)

- `update(dt: number)`:

    - **Cơ chế**: Chạy mỗi khung hình (thông thường là 60 lần/giây). `dt` (Delta Time) là thời gian trôi qua giữa hai frame.
    
    - **Tình huống**: Rất quan trọng khi làm Camera Follow. Nếu đặt Camera di chuyển trong `update`, bạn sẽ thấy hiện tượng rung (jittering) vì nhân vật chưa di chuyển xong mà camera đã bám theo.

### 3. Giai đoạn Ngưng hoạt động & Tiêu hủy (Destruction Phase)

- `onDisable`: Gọi khi Node bị ẩn hoặc script bị tắt. Đây là nơi bắt buộc phải huỷ đăng ký sự kiện (`targetOff`) để tránh lỗi logic khi đối tượng không còn hiện diện.

- `onDestroy`: Gọi khi thực hiện lệnh `node.destroy()`. Dùng để dọn dẹp bộ nhớ thủ công hoặc giải phóng các tài nguyên đặc biệt.

## II. CƠ CHẾ CACHE MODE (LABEL OPTIMIZATION)

**Cache Mode** là một trong những kỹ thuật quan trọng nhất để tối ưu hóa hiệu suất Render. Trong Cocos Creator, mỗi chữ cái trong một Label thông thường sẽ tốn tài nguyên GPU để vẽ.

### 1. Phân tích các tùy chọn (Property Options)

| Cache Mode | Cơ chế vận hành (How it works) | Ảnh hưởng đến Drawcall |
| -----------| -------------------------------| -----------------------|
| **NONE**| Mỗi frame, Engine sẽ tính toán lại mesh và vẽ trực tiếp nội dung Label lên màn hình.| Cao (Mỗi Label thường tốn 1 Drawcall riêng lẻ).|
| **BITMAP** | Engine sẽ render Label ra một texture ảo và đưa vào Dynamic Atlas. Nếu nhiều Label dùng chung font, chúng sẽ được gom lại để vẽ 1 lần. | Thấp (Có thể batching nhiều Label vào 1 Drawcall). |
| **CHAR** | Engine duy trì một bản đồ ký tự (Shared Atlas). Khi một chữ cái xuất hiện, nó được lưu lại để dùng chung cho tất cả các Label khác trong game. | Rất thấp (Tối ưu nhất cho các hệ thống nhiều văn bản). |

### 2. Khi nào thì dùng loại nào? (Deep Dive Case Study)

- **Dùng `NONE` khi**: Làm đồng hồ bấm giờ (Countdown). Vì nội dung thay đổi mỗi 1/60 giây, việc đưa vào bộ nhớ đệm (Cache) sẽ gây quá tải cho CPU hơn là vẽ trực tiếp.

- **Dùng `BITMAP` khi**: Làm các nhãn tên vật phẩm, tiêu đề Menu, hoặc số lượng tiền vàng. Những thứ này ít thay đổi nội dung và nên được gom nhóm để giảm tải cho Card đồ họa.

- **Dùng `CHAR` khi**: Làm hệ thống Chat hoặc đối thoại (Visual Novel). Game có lượng ký tự khổng lồ nhưng các chữ cái (`a, b, c...`) lặp đi lặp lại. `CHAR` mode giúp game không bị giật lag khi hiển thị các đoạn hội thoại dài.