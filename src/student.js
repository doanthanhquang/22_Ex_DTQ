class Student {
  constructor(mssv, name, dob, gender, faculty, course, program, email, phone, status, addresses, idDocuments, nationality) {
      this.mssv = mssv;
      this.name = name;
      this.dob = dob;
      this.gender = gender;
      this.faculty = faculty;
      this.course = course;
      this.program = program;
      this.email = email;
      this.phone = phone;
      this.status = status;
      this.addresses = addresses;
      this.idDocuments = idDocuments;
      this.nationality = nationality;
  }
}

module.exports = Student;