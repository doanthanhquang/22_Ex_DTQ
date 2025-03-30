const fs = require("fs");
const Student = require("../student");

function exportCSV(students) {
  const header =
    "MSSV,Họ Tên,Ngày Sinh,Giới Tính,Khoa,Khóa,Chương Trình,Địa chỉ thường trú,Địa chỉ tạm trú,Địa chỉ nhận thư,Loại giấy tờ,Số giấy tờ,Ngày cấp, Nơi cấp,Ngày hết hạn,Có chip,Quốc gia,Ghi chú,Email,Điện Thoại,Tình Trạng,Quốc tịch\n";
  const data = students
    .map((student) =>
      [
        student.mssv,
        student.name,
        student.dob,
        student.gender,
        student.faculty,
        student.course,
        student.program,
        student.addresses.permanent,
        student.addresses.temporary,
        student.addresses.mailing,
        student.idDocuments.cmnd ? 'CMND' : student.idDocuments.cccd ? 'CCCD' : 'Hộ chiếu',
        checkIdDocument(student.idDocuments).number,
        checkIdDocument(student.idDocuments).issuedDate,
        checkIdDocument(student.idDocuments).issuedBy,
        checkIdDocument(student.idDocuments).expiryDate,
        checkIdDocument(student.idDocuments)?.hasChip,
        checkIdDocument(student.idDocuments)?.country,
        checkIdDocument(student.idDocuments)?.notes,
        student.email,
        student.phone,
        student.status,
        student.nationality,
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
  rows.forEach((row) => {
    if (!row.trim()) return; // Bỏ qua dòng trống
    const [
      mssv,
      name,
      dob,
      gender,
      faculty,
      course,
      program,
      permanent,
      temporary,
      mailing,
      idType,
      number,
      issuedDate,
      issuedBy,
      expiryDate,
      hasChip,
      country,
      notes,
      email,
      phone,
      status,
      nationality,
    ] = row.split(",");

    const addresses = {
      permanent,
      temporary,
      mailing,
    };

    const idDocuments = {};

    if (idType === 'CMND') {
      idDocuments.cmnd = { number, issuedDate, issuedBy, expiryDate };
    } else if (idType === 'CCCD') {
      idDocuments.cccd = { number, issuedDate, issuedBy, expiryDate, hasChip: hasChip === 'true' };
    } else if (idType === 'Hộ chiếu') {
      idDocuments.passport = { number, issuedDate, expiryDate, issuedBy, country, notes };
    }

    const student = new Student(
      mssv,
      name,
      dob,
      gender,
      faculty,
      course,
      program,
      email,
      phone,
      status,
      addresses,
      idDocuments,
      nationality
    );
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

function checkIdDocument(idDocument) {
  if (idDocument.cmnd) {
    return idDocument.cmnd;
  }
  if (idDocument.cccd) {
    return idDocument.cccd;
  }
  if (idDocument.passport) {
    return idDocument.passport;
  }
  return false;
}

module.exports = { readJSON, writeJSON, exportCSV, importCSV };
