const Student = require("./student");

class StudentManager {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
    console.log("Thêm sinh viên thành công!\n");
  }

  updateStudent(mssv, prompt) {
    const student = this.students.find((student) => student.mssv === mssv);
    if (!student) {
      console.log("Không tìm thấy sinh viên với MSSV đã nhập.");
      return;
    }

    console.log(
      "\nNhập thông tin mới cho sinh viên. Nhấn Enter để giữ nguyên thông tin hiện tại.\n"
    );

    student.name = this.updateField("Họ tên", student.name, prompt);
    student.dob = this.updateField("Ngày tháng năm sinh", student.dob, prompt);
    student.gender = this.updateField("Giới tính", student.gender, prompt);

    while (true) {
      student.faculty = this.updateField("Khoa", student.faculty, prompt);
      if (this.validateFaculty(student.faculty)) break;
      console.log("Khoa không hợp lệ! Vui lòng nhập lại.");
    }

    student.course = this.updateField("Khóa", student.course, prompt);
    student.program = this.updateField("Chương trình", student.program, prompt);
    student.address = this.updateField("Địa chỉ", student.address, prompt);

    while (true) {
      student.email = this.updateField("Email", student.email, prompt);
      if (this.validateEmail(student.email)) break;
      console.log("Email không hợp lệ! Vui lòng nhập lại.");
    }

    while (true) {
      student.phone = this.updateField("Số điện thoại", student.phone, prompt);
      if (this.validatePhone(student.phone)) break;
      console.log("Số điện thoại không hợp lệ! Vui lòng nhập lại.");
    }

    while (true) {
      student.status = this.updateField("Tình trạng sinh viên", student.status, prompt);
      if (this.validateStatus(student.status)) break;
      console.log("Tình trạng sinh viên không hợp lệ! Vui lòng nhập lại.");
    }

    console.log("Cập nhật thông tin sinh viên thành công!\n");
  }

  updateField(fieldName, currentValue, prompt) {
    const newValue = prompt(`${fieldName} (${currentValue}): `);
    return newValue.trim() !== "" ? newValue : currentValue;
  }

  removeStudent(mssv) {
    const index = this.students.findIndex((student) => student.mssv === mssv);
    if (index !== -1) {
      this.students.splice(index, 1);
      console.log("Xóa sinh viên thành công!\n");
    } else {
      console.log("Không tìm thấy sinh viên với MSSV đã nhập.\n");
    }
  }

  searchStudent(keyword) {
    const found = this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(keyword.toLowerCase()) ||
        student.mssv === keyword
    );
    if (found.length) {
      found.forEach((student) => console.log(student));
    } else {
      console.log("Không tìm thấy sinh viên nào.\n");
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  }

  validateFaculty(faculty) {
    const validFaculties = [
      "Khoa Luat",
      "Khoa Tieng Anh thuong mai",
      "Khoa Tieng Nhat",
      "Khoa Tieng Phap",
    ];
    return validFaculties.includes(faculty);
  }

  validateStatus(status) {
    const validStatuses = [
      "Dang hoc",
      "Da tot nghiep",
      "Da thoi hoc",
      "Tam dung hoc",
    ];
    return validStatuses.includes(status);
  }
}

module.exports = StudentManager;
