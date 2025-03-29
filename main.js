const prompt = require("prompt-sync")(); 
const Student = require("./src/student");     
const StudentManager = require("./src/studentManager");  

const manager = new StudentManager();

while (true) {
    console.log("\nChương trình quản lý sinh viên");
    console.log("1. Thêm sinh viên mới");
    console.log("2. Xóa sinh viên");
    console.log("3. Tìm kiếm sinh viên");
    console.log("4. Cập nhật thông tin sinh viên");
    console.log("5. Thoát");

    const choice = prompt("Chọn chức năng (1-5): ");

    switch (choice) {
        case "1":
            const mssv = prompt("Mã số sinh viên: ");
            const name = prompt("Họ tên: ");
            const dob = prompt("Ngày tháng năm sinh: ");
            const gender = prompt("Giới tính: ");

            let faculty;
            while (true) {
                console.log("Chọn Khoa: (Khoa Luat, Khoa Tieng Anh thuong mai, Khoa Tieng Nhat, Khoa Tieng Phap)");
                faculty = prompt("Khoa: ");
                if (manager.validateFaculty(faculty)) break;
                console.log("Khoa không hợp lệ! Vui lòng nhập lại.");
            }

            const course = prompt("Khóa: ");
            const program = prompt("Chương trình: ");
            const address = prompt("Địa chỉ: ");

            let email;
            while (true) {
                email = prompt("Email: ");
                if (manager.validateEmail(email)) break;
                console.log("Email không hợp lệ! Vui lòng nhập lại.");
            }

            let phone;
            while (true) {
                phone = prompt("Số điện thoại: ");
                if (manager.validatePhone(phone)) break;
                console.log("Số điện thoại không hợp lệ! Vui lòng nhập lại.");
            }

            let status;
            while (true) {
                console.log("Chọn tình trạng sinh viên: (Dang hoc, Da tot nghiep, Da thoi hoc, Tam dung hoc)");
                status = prompt("Tình trạng sinh viên: ");
                if (manager.validateStatus(status)) break;
                console.log("Tình trạng sinh viên không hợp lệ! Vui lòng nhập lại.");
            }

            const student = new Student(mssv, name, dob, gender, faculty, course, program, address, email, phone, status);
            manager.addStudent(student);
            break;

        case "2":
            const deleteMSSV = prompt("Nhập MSSV của sinh viên cần xóa: ");
            manager.removeStudent(deleteMSSV);
            break;

        case "3":
            const keyword = prompt("Nhập họ tên hoặc MSSV để tìm kiếm: ");
            manager.searchStudent(keyword);
            break;
        case "4":
            const updateMSSV = prompt("Nhập MSSV của sinh viên cần cập nhật: ");
            manager.updateStudent(updateMSSV, prompt);
            break;
        case "5":
            console.log("Thoát chương trình.");
            process.exit(0);  
            break;

        default:
            console.log("Lựa chọn không hợp lệ, vui lòng chọn lại.");
    }
}
