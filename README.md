# Áp dụng Design Patterns trong Cocos Creator

## 1. Singleton Pattern (Mẫu đơn khởi)

### Khái niệm

Singleton đảm bảo một lớp chỉ có duy nhất một instance trong suốt vòng đời của ứng dụng và cung cấp một cổng truy cập toàn cục (Global Access) đến nó.

### Lý do nên sử dụng

Trong game, có những thành phần mang tính "duy nhất" như trình quản lý âm thanh, cấu hình trò chơi hoặc kết nối Server. Việc tạo nhiều instance cho các lớp này sẽ gây lãng phí tài nguyên và xung đột dữ liệu.

### Lợi ích & Bất cập

* **Lợi ích**: Kiểm soát tuyệt đối việc truy cập tài nguyên, tiết kiệm bộ nhớ, dễ dàng gọi từ bất kỳ Script nào mà không cần kéo thả (drag-and-drop) trong Inspector.

* **Bất cập**: Gây ra sự phụ thuộc chặt chẽ (Tight Coupling), khó khăn trong việc viết Unit Test và có thể che giấu các vấn đề về luồng dữ liệu (Global State).

### Ví dụ & Tình huống sử dụng

* Tình huống: Quản lý điểm số và trạng thái chuyển Scene.
* Ví dụ Code:

```
export class DataManager {
    private static _instance: DataManager = null;
    public static get instance(): DataManager {
        if (!this._instance) this._instance = new DataManager();
        return this._instance;
    }

    public userGold: number = 0;
    public currentLevel: number = 1;
}
```

## 2. Observer Pattern (Mẫu người quan sát)

### Khái niệm

Thiết lập cơ chế thông báo để nhiều đối tượng (Observers) có thể theo dõi và phản ứng khi một đối tượng khác (Subject) thay đổi trạng thái mà không cần biết cụ thể các đối tượng đó là ai.

### Lý do nên sử dụng

Giúp tách rời hoàn toàn giữa Logic xử lý và Logic hiển thị. Game hiện đại có hệ thống UI rất phức tạp, Observer giúp UI tự cập nhật mà không làm "bẩn" code của nhân vật.

### Lợi ích & Bất cập

* **Lợi ích:** Dễ dàng thêm mới các tính năng phụ (như thành tựu - Achievement) mà không cần sửa code gốc của nhân vật.

* **Bất cập:** Nếu không quản lý tốt việc `off` event khi hủy Node (`onDestroy`), sẽ gây ra lỗi rò rỉ bộ nhớ (Memory Leak) hoặc crash game do gọi vào đối tượng đã bị xó

### Ví dụ & Tình huống sử dụng

* **Tình huống:** Khi nhân vật nhặt vật phẩm, hệ thống âm thanh phát tiếng "ting", UI túi đồ cập nhật, và hệ thống nhiệm vụ cộng điểm.

* **Ví dụ Code:**

```
// Trong Player.ts
this.node.emit('ITEM_COLLECTED', itemData);

// Trong InventoryUI.ts
playerNode.on('ITEM_COLLECTED', this.refreshUI, this);
```

## 3. State Pattern (Mẫu trạng thái)

### Khái niệm

Cho phép một đối tượng thay đổi hành vi khi trạng thái nội bộ của nó thay đổi. Thay vì dùng một hàm `update` khổng lồ với nhiều `switch-case`, mỗi trạng thái sẽ được đóng gói thành một lớp riêng.

### Lý do nên sử dụng

Nhân vật trong game thường có rất nhiều hành động (Đứng yên, Chạy, Nhảy, Tấn công, Bị choáng). State Pattern giúp quản lý các hành động này một cách sạch sẽ và chuyên nghiệp.

### Lợi ích & Bất cập

* **Lợi ích:** Tuân thủ nguyên tắc Single Responsibility (mỗi lớp trạng thái chỉ lo một việc). Loại bỏ các điều kiện `if-else` lồng nhau phức tạp.

* **Bất cập:** Số lượng Class sẽ tăng lên nhanh chóng nếu nhân vật có quá nhiều trạng thái nhỏ lẻ.

### Ví dụ & Tình huống sử dụng

* **Tình huống:** Xử lý AI của Boss. Khi máu > 50% ở trạng thái "Bình thường", khi máu < 50% chuyển sang trạng thái "Nổi giận" với bộ kỹ năng khác hẳn.

* **Ví dụ Code:**

```
interface BossState { update(): void; }
class AngryState implements BossState {
    update() { /* Boss tấn công nhanh hơn */ }
}
```

## 4. Flyweight Pattern (Mẫu vật nhẹ)

### Khái niệm

Chia sẻ các phần dữ liệu chung (Intrinsic state) giữa nhiều đối tượng để giảm thiểu việc sử dụng bộ nhớ. Những phần dữ liệu thay đổi (Extrinsic state) sẽ được truyền vào khi cần.

### Lý do nên sử dụng

Trong các game bắn súng (Bullet Hell) hoặc dàn trận, việc tạo 1000 đối tượng giống hệt nhau (Sprite, Texture, Sát thương gốc) sẽ ngốn sạch RAM nếu mỗi đối tượng đều giữ một bản sao dữ liệu đó.

### Lợi ích & Bất cập

* **Lợi ích:** Giảm đáng kể dung lượng bộ nhớ và số lượng Draw Call nếu kết hợp tốt với Sprite Atlas trong Cocos.

* **Bất cập:** Làm code phức tạp hơn do phải tách biệt dữ liệu chung và riêng. Việc quản lý vòng đời đối tượng (khi nào dùng lại, khi nào xóa) cần cực kỳ cẩn thận.

### Ví dụ & Tình huống sử dụng

* **Tình huống:** Hệ thống rừng cây trong game thế giới mở. Tất cả cây đều dùng chung một Model/Texture, chỉ khác nhau về vị trí (x, y) và độ xoay.

* **Ví dụ Code:** Kết hợp cc.NodePool trong Cocos Creator để tái sử dụng các Node lính/đạn.

## 5. Command Pattern (Mẫu lệnh)

### Khái niệm

Đóng gói một yêu cầu (request) thành một đối tượng độc lập. Việc này cho phép bạn tham số hóa các phương thức, xếp hàng (queue) yêu cầu và hỗ trợ tính năng hoàn tác (Undo).

### Lý do nên sử dụng

Giúp tách biệt giữa thiết bị nhập (Bàn phím, Joystick, Touch) và hành động thực tế trong game. Điều này cực kỳ hữu ích cho việc đổi phím (Remap key) hoặc làm tính năng xem lại trận đấu (Replay).

### Lợi ích & Bất cập

* **Lợi ích:** Dễ dàng triển khai Undo/Redo. Có thể trì hoãn việc thực thi lệnh (ví dụ: đợi Animation xong mới thực hiện lệnh tiếp theo).

* **Bất cập:** Tạo ra một lớp trung gian làm tăng độ phức tạp của luồng xử lý.

### Ví dụ & Tình huống sử dụng

* **Tình huống:** Game chiến thuật theo lượt hoặc các game giải đố cần tính năng "đi lại bước trước".

* **Ví dụ Code:**

```
interface Command { execute(): void; undo(): void; }
class JumpCommand implements Command {
    constructor(private actor: Player) {}
    execute() { this.actor.jump(); }
    undo() { this.actor.land(); }
}
```