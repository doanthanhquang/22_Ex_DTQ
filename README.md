# 22_Ex_DTQ

# Student Management System

## Mô tả dự án  
Dự án này là một chương trình quản lý danh sách sinh viên chạy trên console. Chương trình cho phép người dùng thực hiện các thao tác sau:  
- Thêm sinh viên mới vào danh sách  
- Xóa sinh viên theo MSSV  
- Cập nhật thông tin sinh viên dựa trên MSSV  
- Tìm kiếm sinh viên theo họ tên hoặc MSSV  

Chương trình kiểm tra tính hợp lệ của các trường như email, số điện thoại, khoa, và tình trạng sinh viên.  

---

## Cấu trúc source code 

- `src/`  
  - `student.js`  
  - `studentManager.js`  
  - `main.js`  

## Hướng dẫn cài đặt & chạy chương trình  

### 1. Cài đặt Node.js  
Trước khi chạy chương trình, hãy đảm bảo bạn đã cài đặt **Node.js** trên máy.  
Có thể tải về tại: [Node.js Official Site](https://nodejs.org/)

### 2. Clone project về máy  
```bash
git clone https://github.com/doanthanhquang/22_Ex_DTQ
cd 22_Ex_DTQ
```

### 3. Cài đặt các gói phụ thuộc  
```bash
npm install
```

### 4. Chạy chương trình  
```bash
node main.js
```

### 5. Hình ảnh các tính năng
Thêm mới khoa, chương trình, tình trạng sinh viên và đổi tên khoa, chương trình, tình trạng sinh viên
![Thêm khoa và sửa tên khoa](./src/assets/images/add_faculty.png)

Import JSON
![Import JSON](./src/assets/images/import.png)
