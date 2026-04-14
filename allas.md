# ATLAS VÀ AUTO ATLAS
## Atlas
### Atlas là gì?
Atlas còn có tên gọi khác là Sprite sheet, atlas thường được tạo ra bởi các tool hiện nay như TexturePacker hay auto atlas trên chính cocos.

Atlas được tạo nên từ việc các tool sẽ gộp các file PNG lại thanh 1 hình lớn chứa tất cả các hình đã được gộp.

### Tại sao lại cần Atlas
Thông thương 1 sprite bình thường thì hệ thống sẽ tự động trim các vùng trồng xung quanh hình, nếu có nhiều hình hệ thống phải xử lý và render nhiều bức hình và thực hiện trim từng tấm. Nhưng khi ta gộp nhiều hình ảnh vào làm 1 file atlas hệ thống sẽ tự động xoá các khoảng trống trên và lấp đầy chúng bằng các hình ảnh, khi thực hiện render lúc này hệ thống chỉ cần phải thực hiện việc render cho đúng duy nhất 1 hình duy nhất giúp tăng perfomance cho sản phẩm.

### Nhưng lợi ích của Atlas
Nhưng lợi ích của Atlas:
- Trong quá trình gộp nhiều bức hình, các khoảng trống của hình ảnh sẽ được loại bỏ, việc xử lý render được giảm bớt giúp giảm kích thước và bộ nhớ của game.
- Khi nhiều hình cùng được dùng chung 1 Atlas chúng hoàn toàn có thể được xử lý cho 1 lệnh render duy nhất giúp giảm tiêu tốn CPU của máy.

## Auto atlas
### Auto atlas là gì
Auto asset là một chức năng của Cocos giúp ta có thể nhanh chóng tạo được 1 file atlas mà không cần thông qua 1 tool bên ngoài khác.

### Tại sao lại cần auto atlas
Trong việc tôi ưu performance cho game nó giúp giải quyết 2 vấn đề sau:
- Giảm draw call: thay vì phải vẽ 10 tấm hình nhỏ khác nhau, ta có thể chỉ cần phải vẽ 1 tấm hình lớn duy nhất khi gộp chúng lại thành 1.
- Thuận tiện và linh hoạt: không cần thiết phải sử dụng các phần mềm bên ngoài mà có thể tạo trực tiếp và ngay lập tức.

### Những điểm cần lưu ý
Chúng ta có thể thấy sự tiện lợi và đơn giản sử dụng của auto atlas, thế nó có bất cập gì nếu ta chỉ sử dụng mỗi nó:
- Auto alas là một chức năng đơn giản. nó thiếu các chức năng edit chuyên sâu như các tool bên ngoài như TexturePacker
- Nếu so sánh thì các file build ra từ auto atlas vẫn có phần nặng hơn so với TexturePacker nên nếu để tối ưu chuyên sâu vẫn nên dùng tool bên ngoài, auto atlas hợp với cái project vừa và nhỏ không quá lớn.