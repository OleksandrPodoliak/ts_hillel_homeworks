class School {
  directions: Direction[] = [];

  addDirection(direction: Direction): void {
    this.directions.push(direction);
  }
}

class Direction {
  _name: string;
  levels: Level[] = [];

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }
}

class Level {
  _name: string;
  _program: string;
  groups: Group[] = [];

  constructor(name: string, program: string) {
    this._name = name;
    this._program = program;
  }

  get name(): string {
    return this._name;
  }

  get program(): string {
    return this._program;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }
}

class Group {
  directionName: string;
  levelName: string;
  _students: Student[] = [];

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  showPerformance(): Student[] {
    return this._students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Student {
  firstName: string;
  lastName: string;
  birthYear: number;
  grades: any = {};
  attendance: boolean[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: any[] = Object.values(this.grades);

    if (!gradeValues.length) {
      return 0;
    }

    const averageGrade: number =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

console.log('start');