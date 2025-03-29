class Student {
  constructor(mssv, name, dob, gender, faculty, course, program, address, email, phone, status) {
      this.mssv = mssv;
      this.name = name;
      this.dob = dob;
      this.gender = gender;
      this.faculty = faculty;
      this.course = course;
      this.program = program;
      this.address = address;
      this.email = email;
      this.phone = phone;
      this.status = status;
  }
}

module.exports = Student;