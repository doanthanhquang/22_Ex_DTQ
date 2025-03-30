const prompt = require("prompt-sync")();
const Student = require("./src/student");
const StudentManager = require("./src/studentManager");
const logger = require("./src/utils/logger");

const manager = new StudentManager();

logger.info("Ứng dụng Student Manager đã khởi động.");
while (true) {
  console.log("\nChương trình quản lý sinh viên");
  console.log("1. Thêm sinh viên mới");
  console.log("2. Xóa sinh viên");
  console.log("3. Tìm kiếm sinh viên");
  console.log("4. Cập nhật thông tin sinh viên");
  console.log("5. Quản lý khoa, tình trạng, chương trình");
  console.log("6. Export CSV");
  console.log("7. Import CSV");
  console.log("8. Export JSON");
  console.log("9. Import JSON");
  console.log("10. Thoát");

  const choice = prompt("Chọn chức năng (1-10): ");

  try {
    switch (choice) {
      case "1":
        const mssv = prompt("Mã số sinh viên: ");
        const name = prompt("Họ tên: ");
        const dob = prompt("Ngày tháng năm sinh: ");
        const gender = prompt("Giới tính: ");

        let faculty;
        while (true) {
          console.log(`Chọn Khoa: (${manager.faculties.join(", ")})`);
          faculty = prompt("Khoa: ");
          if (manager.validateFaculty(faculty)) break;
          console.log("Khoa không hợp lệ! Vui lòng nhập lại.");
        }

        const course = prompt("Khóa: ");
        while (true) {
          console.log(`Chọn chương trình: (${manager.programs.join(", ")})`);
          program = prompt("Chương trình: ");
          if (manager.validateProgram(program)) break;
          console.log("Chương trình không hợp lệ! Vui lòng nhập lại.");
        }
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
          console.log(
            `Chọn tình trạng sinh viên: (${manager.statuses.join(", ")})`
          );
          status = prompt("Tình trạng sinh viên: ");
          if (manager.validateStatus(status)) break;
          console.log("Tình trạng sinh viên không hợp lệ! Vui lòng nhập lại.");
        }

        const student = new Student(
          mssv,
          name,
          dob,
          gender,
          faculty,
          course,
          program,
          address,
          email,
          phone,
          status
        );
        manager.addStudent(student);
        logger.info(`Đã thêm sinh viên: ${mssv} - ${name}`);
        break;

      case "2":
        const deleteMSSV = prompt("Nhập MSSV của sinh viên cần xóa: ");
        manager.removeStudent(deleteMSSV);
        logger.info(`Đã xóa sinh viên: ${deleteMSSV}`);
        break;

      case "3":
        const keyword = prompt("Nhập họ tên hoặc MSSV để tìm kiếm: ");
        manager.searchStudent(keyword);
        logger.info(`Tìm kiếm sinh viên với từ khóa: ${keyword}`);
        break;
      case "4":
        const updateMSSV = prompt("Nhập MSSV của sinh viên cần cập nhật: ");
        manager.updateStudent(updateMSSV, prompt);
        logger.info(`Cập nhật thông tin sinh viên có MSSV: ${updateMSSV}`);
        break;
      case "5":
        while (true) {
          console.log("\nQuản lý Khoa, Tình trạng, và Chương trình");
          console.log("1. Thêm mới khoa");
          console.log("2. Đổi tên khoa");
          console.log("3. Thêm mới tình trạng sinh viên");
          console.log("4. Đổi tên tình trạng sinh viên");
          console.log("5. Thêm mới chương trình");
          console.log("6. Đổi tên chương trình");
          console.log("7. Trở về menu chính");

          const subChoice = prompt("Chọn chức năng (1-7): ");
          switch (subChoice) {
            case "1":
              const newFaculty = prompt("Nhập tên khoa mới: ");
              manager.addFaculty(newFaculty);
              logger.info(`Thêm khoa mới: ${newFaculty}`);
              break;

            case "2":
              const oldFacultyName = prompt("Nhập tên khoa cũ: ");
              const newFacultyName = prompt("Nhập tên khoa mới: ");
              manager.renameFaculty(oldFacultyName, newFacultyName);
              logger.info(
                `Đổi tên khoa từ ${oldFacultyName} sang ${newFacultyName}`
              );
              break;

            case "3":
              const newStatus = prompt("Nhập tình trạng sinh viên mới: ");
              manager.addStatus(newStatus);
              logger.info(`Thêm tình trạng sinh viên mới: ${newStatus}`);
              break;

            case "4":
              const oldStatus = prompt("Nhập tên tình trạng cũ: ");
              const newStatusName = prompt("Nhập tên tình trạng mới: ");
              manager.renameStatus(oldStatus, newStatusName);
              logger.info(
                `Đổi tên tình trạng sinh viên từ ${oldStatus} sang ${newStatusName}`
              );
              break;

            case "5":
              const newProgram = prompt("Nhập tên chương trình mới: ");
              manager.addProgram(newProgram);
              logger.info(`Thêm chương trình mới: ${newProgram}`);
              break;

            case "6":
              const oldProgramName = prompt("Nhập tên chương trình cũ: ");
              const newProgramName = prompt("Nhập tên chương trình mới: ");
              manager.renameProgram(oldProgramName, newProgramName);
              logger.info(
                `Đổi tên chương trình từ ${oldProgramName} sang ${newProgramName}`
              );
              break;

            case "7":
              console.log("Quay trở về menu chính...");
              break;

            default:
              console.log("Lựa chọn không hợp lệ.");
          }
          if (subChoice === "7") break;
        }

        break;
      case "6":
        manager.handleExportCSV();
        logger.info("Đã export dữ liệu sinh viên ra CSV.");
        break;
      case "7":
        const filePath = prompt("Nhập đường dẫn file CSV để Import: ");
        manager.handleImportCSV(filePath);
        logger.info(`Import dữ liệu sinh viên từ file CSV: ${filePath}`);
        break;
      case "8":
        manager.handleExportJSON();
        logger.info("Đã export dữ liệu sinh viên ra JSON.");
        break;
      case "9":
        const jsonFilePath = prompt("Nhập đường dẫn file JSON để Import: ");
        manager.handleImportJSON(jsonFilePath);
        logger.info(`Import dữ liệu sinh viên từ file JSON: ${jsonFilePath}`);
        break;
      case "10":
        console.log("Thoát chương trình.");
        process.exit(0);
        break;
      default:
        console.log("Lựa chọn không hợp lệ, vui lòng chọn lại.");
    }
  } catch (error) {
    logger.error(`Lỗi xảy ra: ${error.message}`);
    console.log("Có lỗi xảy ra, vui lòng thử lại.");
  }
}
