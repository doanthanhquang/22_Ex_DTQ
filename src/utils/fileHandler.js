const fs = require("fs");
const Student = require("../student");

function exportCSV(students) {
  const header = "MSSV,Họ Tên,Ngày Sinh,Giới Tính,Khoa,Khóa,Chương Trình,Địa Chỉ,Email,Điện Thoại,Tình Trạng\n";
  const data = students
    .map(student =>
      [
        student.mssv, student.name, student.dob, student.gender, student.faculty,
        student.course, student.program, student.address, student.email, student.phone, student.status,
      ].join(",")
    )
    .join("\n");

  fs.writeFileSync("./export/students.csv", header + data);
  console.log("Export CSV thành công tại: ./export/students.csv");
}

// Import CSV
function importCSV(filePath, students) {
  const csvData = fs.readFileSync(filePath, "utf8");
  const rows = csvData.split("\n").slice(1); // Bỏ qua header
  rows.forEach(row => {
    if (!row.trim()) return; // Bỏ qua dòng trống
    const [mssv, name, dob, gender, faculty, course, program, address, email, phone, status] = row.split(",");
    const student = new Student(mssv, name, dob, gender, faculty, course, program, address, email, phone, status);
    students.push(student);
  });
  console.log(`Import CSV thành công từ file: ${filePath}`);
}

// Đọc file JSON
function readJSON(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Ghi file JSON
function writeJSON(data) {
  fs.writeFileSync("./export/students.json", JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON, exportCSV, importCSV };
