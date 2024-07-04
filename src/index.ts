type Lecturer = {
  name: string;
  surname: string;
  gender: Gender;
  position: string;
  company: string;
  experience: Experience;
  courses: Course[];
  contacts: Contact[];
}

type Gender = (
  'Male'
  | 'Female'
  | 'Non-Binary'
  | 'Genderqueer'
  | 'Agender'
  | 'Deer'
);

type Experience = `${Years} years`;
type Years = 1 | 2 | 3 | 4 | 5;

type Course = (
  "JavaScript"
  | "TypeScript"
  | "vue.js"
  | "react"
);

type Contact = {
  type: ContactType | SocialMedia;
  value: string;
}

type ContactType = (
  "email"
  | "phone"
  | "telegram"
);

type SocialMedia = (
  "facebook"
  | "instagram"
  | "onlyFans"
);

class School {
  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(area: Area): void {
    this._areas = this._areas.filter((el) => el.name != area.name);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter((el) => {
      return `${el.name} ${el.surname}` != `${lecturer.name} ${lecturer.surname}`
    });
  }
}

class Area {
  _name: string;
  _levels: Level[] = [];

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    this._levels = this._levels.filter((el) => el.name != level.name);
  }
}

class Level {
  _name: string;
  _description: string;
  _groups: Group[] = [];

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    this._groups = this._groups.filter((el) => el.name != group.name);
  }
}

//* Зараз 4 ночі помилку toSorted цей код виправляє
//* На старті спроб було розуміння, що треба модифікувати prototype глобального масиву
//* Вийшло, щось таке, до кінця зрозуміти код поки не вийшло, бракує знань
//* Давайте цей кейс повністю пройдемо на лекції і розберемо кожну строчку
interface Array<T> {
  toSorted(compareFn: (a: T, b: T) => number): T[];
}
Array.prototype.toSorted = function<T>(compareFn: (a: T, b: T) => number): T[] {
  return [...this].sort(compareFn);
};
//* -----------------------------------------------

class Group {
  _name: string;
  _levelName: string;
  _status: string = '';
  _students: Student[] = [];

  constructor(name: string, levelName: string) {
    this._name = name;
    this._levelName = levelName;
  }

  get name(): string {
    return this._name;
  }

  get levelName(): string {
    return this._levelName;
  }

  get status(): string {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter((el) => el.fullName != student.fullName);
  }

  showPerformance(course: Course): Student[] {
    return this._students.toSorted((a, b) => b.getPerformanceRating(course) - a.getPerformanceRating(course));
  }
}

//* Цікаво вийшло з такою структурою даних
type Grade = {
  [key in Course]?: number[];
};

type Visit = {
  [key in Course]?: boolean[];
};

class Student {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: Grade = {};
  _visits: Visit = {};

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(course: Course, mark: number): void {
    let gradesOfCourse = this._grades[course];
    
    if (gradesOfCourse) {
      gradesOfCourse.push(mark);
    } else {
      gradesOfCourse = [mark];
    }
  }

  setVisit(course: Course, present: boolean): void {
    let visitsOfCourse = this._visits[course];
    
    if (visitsOfCourse) {
      visitsOfCourse.push(present);
    } else {
      visitsOfCourse = [present];
    }
  }

  getPerformanceRating(course: Course): number {
    const grades = this._grades[course];
    const visits = this._visits[course];

    const gradeValues: number[] = grades ? grades : [];

    if (!gradeValues?.length) {
      return 0;
    }

    const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number = visits ? (visits.filter(present => present).length / visits.length) * 100 : 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}