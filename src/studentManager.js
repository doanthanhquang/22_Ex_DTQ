const { exportCSV, importCSV, readJSON, writeJSON } = require("./utils/fileHandler");

class StudentManager {
  constructor() {
    this.students = [];

    this.faculties = [
      "Khoa Luat",
      "Khoa Tieng Anh thuong mai",
      "Khoa Tieng Nhat",
      "Khoa Tieng Phap",
    ];
    this.statuses = [
      "Dang hoc",
      "Da tot nghiep",
      "Da thoi hoc",
      "Tam dung hoc",
    ];
    this.programs = ["Chinh quy"];

    this.nationalities = [];
    this.addresses = {
      permanent: '',
      temporary: '',
      mailing: '',
    };
    this.idDocuments = {
      cmnd: { number: '', issuedDate: '', issuedBy: '', expiryDate: '' },
      cccd: { number: '', issuedDate: '', issuedBy: '', expiryDate: '', hasChip: false },
      passport: { number: '', issuedDate: '', expiryDate: '', issuedBy: '', country: '', notes: '' },
    };
  }

  addStudent(student) {
    this.students.push(student);
    console.log("Thêm sinh viên thành công!\n");
    console.log("==============================================================");
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
    while (true) {
      student.program = this.updateField("Chương trình", student.program, prompt);
      if (this.validateProgram(student.program)) break;
      console.log("Chương trình không hợp lệ! Vui lòng nhập lại.");
    }

    student.addresses.permanent = this.updateField("Địa chỉ thường trú", student.addresses.permanent, prompt);
    student.addresses.temporary = this.updateField("Địa chỉ tạm trú", student.addresses.temporary, prompt);
    student.addresses.mailing = this.updateField("Địa chỉ nhận thư", student.addresses.mailing, prompt);

    const idDocuments = {};

    console.log("\nChọn loại giấy tờ tùy thân:");
    console.log("1. CMND");
    console.log("2. CCCD");
    console.log("3. Hộ chiếu");

    const idChoice = prompt("Chọn loại giấy tờ (1-3): ");

    if (idChoice === "1") {
      idDocuments.cmnd = {
        number: this.updateField("Số CMND", student.idDocuments?.cmnd?.number || "", prompt),
        issuedDate: this.updateField("Ngày cấp CMND", student.idDocuments?.cmnd?.issuedDate || "", prompt),
        issuedBy: this.updateField("Nơi cấp CMND", student.idDocuments?.cmnd?.issuedBy || "", prompt),
        expiryDate: this.updateField("Ngày hết hạn CMND", student.idDocuments?.cmnd?.expiryDate || "", prompt),
      };
    } else if (idChoice === "2") {
      idDocuments.cccd = {
        number: this.updateField("Số CCCD", student.idDocuments?.cccd?.number || "", prompt),
        issuedDate: this.updateField("Ngày cấp CCCD", student.idDocuments?.cccd?.issuedDate || "", prompt),
        issuedBy: this.updateField("Nơi cấp CCCD", student.idDocuments?.cccd?.issuedBy || "", prompt),
        expiryDate: this.updateField("Ngày hết hạn CCCD", student.idDocuments?.cccd?.expiryDate || "", prompt),
        hasChip: this.updateField("Có gắn chip không? (true/false)", student.idDocuments?.cccd?.hasChip, prompt),
      };
    } else if (idChoice === "3") {
      idDocuments.passport = {
        number: this.updateField("Số hộ chiếu", student.idDocuments?.passport?.number || "", prompt),
        issuedDate: this.updateField("Ngày cấp hộ chiếu", student.idDocuments?.passport?.issuedDate || "", prompt),
        expiryDate: this.updateField("Ngày hết hạn hộ chiếu", student.idDocuments?.passport?.expiryDate || "", prompt),
        issuedBy: this.updateField("Nơi cấp hộ chiếu", student.idDocuments?.passport?.issuedBy || "", prompt),
        country: this.updateField("Quốc gia cấp hộ chiếu", student.idDocuments?.passport?.country || "", prompt),
        notes: this.updateField("Ghi chú", student.idDocuments?.passport?.notes || "", prompt),
      };
    }

    student.idDocuments = idDocuments;

    student.nationality = this.updateField("Quốc tịch", student.nationality, prompt);

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
    console.log("==============================================================");
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
      console.log("==============================================================");
    } else {
      console.log("Không tìm thấy sinh viên với MSSV đã nhập.\n");
      console.log("==============================================================");
    }
  }

  searchStudent(keyword, faculty = null) {
    const found = this.students.filter((student) => {
      const matchName = student.name.toLowerCase().includes(keyword.toLowerCase());
      const matchMSSV = student.mssv === keyword;
      const matchFaculty = faculty ? student.faculty.toLowerCase().includes(faculty.toLowerCase()) : true;
  
      return (matchName || matchMSSV) && matchFaculty;
    });
  
    if (found.length) {
      found.forEach((student) => console.log(student));
    } else {
      console.log("Không tìm thấy sinh viên nào.\n");
      console.log("==============================================================");
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
    return this.faculties.includes(faculty);
  }

  validateProgram(program) {
    return this.programs.includes(program);
  }

  validateStatus(status) {
    return this.statuses.includes(status);
  }

  addFaculty(newFaculty) {
    if (!this.faculties.includes(newFaculty)) {
      this.faculties.push(newFaculty);
      console.log(`Đã thêm khoa mới: ${newFaculty}\n`);
    } else {
      console.log("Khoa này đã tồn tại.\n");
    }
  }

  addStatus(newStatus) {
    if (!this.statuses.includes(newStatus)) {
      this.statuses.push(newStatus);
      console.log(`Đã thêm tình trạng sinh viên mới: ${newStatus}\n`);
    } else {
      console.log("Tình trạng sinh viên này đã tồn tại.\n");
    }
  }

  addProgram(newProgram) {
    if (!this.programs.includes(newProgram)) {
      this.programs.push(newProgram);
      console.log(`Đã thêm chương trình mới: ${newProgram}\n`);
    } else {
      console.log("Chương trình này đã tồn tại.\n");
    }
  }

  renameFaculty(oldName, newName) {
    const index = this.faculties.indexOf(oldName);
    if (index !== -1) {
      this.faculties[index] = newName;
      console.log(`Đã đổi tên khoa từ "${oldName}" thành "${newName}".\n`);
    } else {
      console.log("Không tìm thấy khoa để đổi tên.\n");
    }
  }

  renameStatus(oldName, newName) {
    const index = this.statuses.indexOf(oldName);
    if (index !== -1) {
      this.statuses[index] = newName;
      console.log(`Đã đổi tên tình trạng sinh viên từ "${oldName}" thành "${newName}".\n`);
    } else {
      console.log("Không tìm thấy tình trạng sinh viên để đổi tên.\n");
    }
  }

  renameProgram(oldName, newName) {
    const index = this.programs.indexOf(oldName);
    if (index !== -1) {
      this.programs[index] = newName;
      console.log(`Đã đổi tên chương trình từ "${oldName}" thành "${newName}".\n`);
    } else {
      console.log("Không tìm thấy chương trình để đổi tên.\n");
    }
  }

  // Export CSV
  handleExportCSV() {
    exportCSV(this.students);
  }

  // Import CSV
  handleImportCSV(filePath) {
    importCSV(filePath, this.students);
  }

  // Export JSON
  handleExportJSON() {
    const studentsData = this.students.map(student => ({
        mssv: student.mssv,
        name: student.name,
        dob: student.dob,
        gender: student.gender,
        faculty: student.faculty,
        course: student.course,
        program: student.program,
        addresses: student.addresses,
        email: student.email,
        phone: student.phone,
        status: student.status,
        idDocuments: student.idDocuments,
        nationality: student.nationality,
    }));
    
    writeJSON(studentsData);
    console.log(`Export JSON thành công tại: ./export/students.json`);
  }

  // Import JSON
  handleImportJSON(filePath) {
    const data = readJSON(filePath);
    this.students = data;
    console.log(`Import JSON thành công từ file: ${filePath}`);
  }
}

module.exports = StudentManager;
