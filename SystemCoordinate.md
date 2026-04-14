### HỆ TOẠ ĐỘ VÀ ĐIỂM NEO
## 1. Bản chất của hệ toạ độ
Trong lập trình game không thể nào có việc 1 đối tượng xác định có thể đứng độc lập mà không thể xác định vị trí của nó có thể nằm ở đâu, vì vậy cần có hệ thống space giúp cho các lập trình viên có thể xác định chính xác vị trí của từng đối tượng trên scene.

### 1.1 World space
World space là hệ toạ độ gốc của toàn bộ scene.
- Đặc điểm: nó mang tính duy nhất. Khác với local space thì toạ độ (0, 0) của world space là vị trí cố định mà toàn bộ các đối tượng khác dùng làm mốc tham chiếu.
- Khi chúng ta cần xử lý logic giữa 2 đối tượng riêng biệt không có quan hệ cha-con, ta buộc phải so sánh vị trí của chúng trên world space để có thể xử lý logic va chạm 1 cách chính xác nhất
### 1.2 Local space
Local space là không gian được thiết lập dựa trên chính Node cha của đối tượng đó.
- Tính kế thừa: Đây là đặc điểm quan trọng nhất. Khi Node cha di chuyển, xoay hoặc thay đổi kích thước, toàn bộ hệ toạ độ Local Space của Node con sẽ biến đổi theo. Tuy nhiên các giá trị của node con vẫn sẽ không thay đổi.
- Ưu điểm: giúp đóng gói các đối tượng phức tạp, ví dụ 1 model nhân vật với nhiều phần riêng biệt như đầu, tay và chân khi đóng gói nói là con của 1 node cha, khi thay đổi position hay bất cứ thuọc tính gì của Nodes sẽ làm thay đổi toàn bộ vị trí, kích thước hoặc độ xoay của toàn bộ node con mà không làm thay đổi giá trị của chính node con đó'

## 2. Anchor Point
### 2.1 Định nghĩa
Anchor point là một điểm neo xác định bên trong kích thước đối tượng được biểu diễn bằng hệ giá trị từ 0 tới 1. Anchor point không bị ảnh hưởng bởi kích thước của đối tượng nên dù kích thước của đối tượng là bao nhiêu thì biểu diễn của nó cũng vẫn là từ 0 tới 1.
- (0.5, 0.5): tâm đối tượng.
- (0, 0): góc dưới bên trái.
- (1, 1): góc trên bên phải.
### 2.2 Ảnh hưởng đến trasnform
Anchor point không chỉ là một điểm mốc vị trí, nó là gốc của mọi phép biến đổi:
- Position: Toạ độ của node chính là vị trí của điểm Anchor này trong gian của cha.
- Rotation: Khi bạn ra lệnh xoay, Node sẽ xoay quanh trục đi qua Anchor Point.
- Scale: Khi phóng to/thu nhỏ, Anchor point sẽ là điểm đứng yên duy nhất, các cạnh còn lại sẽ co/dãn ra dựa theo điểm này.