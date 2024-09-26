//* Вам необхідно написати додаток Todo list. У списку нотаток повинні бути методи для додавання нового запису, 
//* видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток.
//* Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток
//* у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.
//* Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі,
//* які вимагають підтвердження при ридагуванні.
//* Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
//* Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

import { v4 as uuidv4 } from 'uuid';

enum TaskStatus {
  Inwork = 'inwork',
  Done = 'done',
}

interface ITask {
  id: string;
  title: string;
  content: string;
  createDate: Date;
  status: TaskStatus;
  confirm: boolean;
  toDoneStatus(): void;
  edit(title: string, content: string): void;
}

class Task implements ITask {
  public id;
  public createDate;
  public status: TaskStatus;

  constructor(
    public title: string,
    public content: string,
    public confirm: boolean = false,
  ) {
    if (!title || !content) {
      throw new Error('Empty content or title');
    }
    
    this.id = uuidv4();
    this.createDate = new Date();
    this.status = TaskStatus.Inwork;
  }

  public toDoneStatus(): void {
    this.status = TaskStatus.Done;
  }

  public edit(title: string, content: string): void {
    if (!title || !content) {
      throw new Error('Empty content or title');
    }

    if (this.confirm) {
      if (!confirm("Are you sure?")) {
        return;
      }
    }

    this.title = title;
    this.content = content;
  }
}

class TodoList {
  private tasks: Task[] = [];

  public create(title: string, content: string, confirm: boolean = false): Task {
    if (!title || !content) {
      throw new Error('Empty content or title');
    }

    const task = new Task(title, content, confirm);
    this.tasks.push(task);
    return task;
  }

  public delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  public editById(id: string, title: string, content: string): void {
    if (!title || !content) {
      throw new Error('Empty content or title');
    }

    const task = this.getTaskById(id);
    
    if (task) {
      task.edit(title, content);
    } else {
      throw new Error("Can't find task by id");
    }
  }

  public toDoneStatusById(id: string): void {
    const task = this.getTaskById(id);
    
    if (task) {
      task.toDoneStatus();
    } else {
      throw new Error("Can't find task by id");
    }
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksCount(): number {
    return this.tasks.length;
  }

  public getInWorkTasksCount(): number {
    return this.tasks.filter(task => task.status === TaskStatus.Inwork).length;
  }

  public searchTasks(query: string): Task[] {
    return this.tasks.filter(task => {
        return (
          task.title.toLowerCase().includes(query.toLowerCase())
          || task.content.toLowerCase().includes(query.toLowerCase())
        )
      }
    );
  }

  public sortTasksByStatus(): Task[] {
    return this.tasks.sort((a, b) => a.status.localeCompare(b.status));
  }

  public sortTasksByCreateDateParam(): Task[] {
    return this.tasks.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
  }
}