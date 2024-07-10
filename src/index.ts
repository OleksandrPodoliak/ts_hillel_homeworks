//* Створіть класи Circle, Rectangle, Square і Triangle. У кожного з них є загальнодоступний метод calculateArea.
//* У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення.
//* У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

type Color = 'red' | 'green' | 'blue';
type FigureName = 'Circle' | 'Rectangle' | 'Square' | 'Triangle';

interface IFigure {
  name: FigureName;
  color: Color;
  calculateArea(): number;
}

interface IPrintableFigure extends IFigure {
  print(): void;
}

interface ICircle extends IFigure {
  radius: number;
}

interface IRectangle extends IPrintableFigure {
  width: number;
  height: number;
}

interface ISquare extends IPrintableFigure {
  side: number;
}

interface ITriangle extends IFigure {
  base: number;
  height: number;
}

abstract class Figure implements IFigure {
  constructor(public readonly name: FigureName, public readonly color: Color) {}

  public abstract calculateArea(): number;
}

class Circle extends Figure implements ICircle {
  constructor(color: Color, public radius: number) {
    super('Circle', color);
  }

  public calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Figure implements IRectangle {
  constructor(color: Color, public width: number, public height: number) {
    super('Rectangle', color);
  }

  public calculateArea(): number {
    return this.width * this.height;
  }

  public print(): void {
    console.log(`S = width * height`);
  }
}

class Square extends Figure implements ISquare {
  constructor(color: Color, public side: number) {
    super('Square', color);
  }

  public calculateArea(): number {
    return Math.pow(this.side, 2);
  }

  public print(): void {
    console.log(`S = side ^ 2`);
  }
}

class Triangle extends Figure implements ITriangle {
  constructor(color: Color, public base: number, public height: number) {
    super('Triangle', color);
  }

  public calculateArea(): number {
    return 0.5 * this.base * this.height;
  }
}
