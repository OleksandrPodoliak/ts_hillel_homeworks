//* Проєкт "Шашки" - це реалізація базової логіки гри в шашки без інтерфейсу. Проєкт включатиме такі аспекти,
//* як правила руху фігур, захоплення шашок (биття), та визначення переможця.

//* Ключові аспекти:
//* 1. Ігрове поле:
//* * Ігрове поле являє собою квадрат 8x8, де білі та чорні клітинки чергуються.
//* * Початкова розстановка шашок: кожна сторона має 12 шашок, розташованих на перших трьох рядах чорних клітинок.
//* 2. Правила руху:
//* * Звичайні шашки можуть рухатися тільки вперед по діагоналі.
//* * Дамки, досягнувши останнього ряду, можуть рухатися по діагоналі в будь-якому напрямку.
//* 3. Захоплення (биття):
//* * Шашки можуть "бити" шашки суперника, перестрибуючи через них на вільну клітинку.
//* * Якщо є можливість взяти одну або кілька шашок за один хід, гравець зобов’язаний це зробити.
//* 4. Перемога:
//* * Гра закінчується, коли в одного з гравців немає шашок або немає можливих ходів.
//* 5. Ігровий процес:
//* * Гравці ходять по черзі.
//* * Система повинна вміти обробляти всі можливі ходи, перевіряти їх на коректність, враховувати взяття шашок та перетворення на дамки.
//* 6. Перевірка переможця:
//* * Гра завершується автоматично, щойно один з гравців позбавляється всіх шашок або не має доступних ходів.
//* 7. Збір даних та логіка гри:
//* * Ігрове поле, позиції шашок та поточний хід зберігатимуться у структурах даних.
//* * Логіка перевірки можливих ходів і захоплень буде реалізована у вигляді функцій або методів класів.
//* Приділіть особливи увагу декомпозиції на окремі класи та їх звʼязок.

import { v4 as uuidv4 } from 'uuid';

export enum CheckerColor {
  BLACK = 'black',
  WHITE = 'white',
}

export type BoardSize = 8;
export type CellBoardType = Checker | null;
export type BoardType = CellBoardType[][];

export interface IChecker {
  color: CheckerColor,
};

export interface IBoard {
  board: BoardType,
  size: BoardSize,
  initBoard(): BoardType,
  setCheckersToBoard(board: BoardType): BoardType,
  getChecker(x: number, y: number): CellBoardType,
  removeChecker(x: number, y: number): void,
  isOutOfBoard(x: number, y: number): boolean,
};

export interface IGame {
  id: string,
  board: Board,
  currentPlayer: CheckerColor,
  isValidMove(fromX: number, fromY: number, toX: number, toY: number): boolean,
  makeMove(fromX: number, fromY: number, toX: number, toY: number): void,
  switchPlayer(): void,
  checkForWin(): boolean,
};

export class Checker implements IChecker {
  constructor(public readonly color: CheckerColor) {}
}

export class Board implements IBoard {
  public readonly board: BoardType;
  public readonly size: BoardSize = 8;

  constructor() {
    this.board = this.initBoard();
  }

  public initBoard(): BoardType {
    const emptyBoard: BoardType = 
      Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));

    return this.setCheckersToBoard(emptyBoard);
  }

  public setCheckersToBoard(board: BoardType): BoardType {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < this.size; y++) {
        if ((x + y) % 2 !== 0) {
          board[x][y] = new Checker(CheckerColor.BLACK);
        }
      }
    }

    for (let x = 5; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if ((x + y) % 2 !== 0) {
          board[x][y] = new Checker(CheckerColor.WHITE);
        }
      }
    }

    return board;
  }

  public getChecker(x: number, y: number): CellBoardType {
    return this.board[x][y];
  }

  public moveChecker(fromX: number, fromY: number, toX: number, toY: number): void {
    const checker: CellBoardType = this.getChecker(fromX, fromY);
    this.board[toX][toY] = checker;
    this.board[fromX][fromY] = null;
  }

  public removeChecker(x: number, y: number): void {
    this.board[x][y] = null;
  }

  public isOutOfBoard(x: number, y: number): boolean {
    return !(
      x >= 0
      && y >= 0
      && x < this.size
      && y < this.size
    );
  }
}

export class Game implements IGame {
  public readonly id: string;
  public readonly board: Board;
  public currentPlayer: CheckerColor;

  constructor() {
    this.id = uuidv4();
    this.board = new Board();
    this.currentPlayer = CheckerColor.WHITE;
  }

  public isValidMove(fromX: number, fromY: number, toX: number, toY: number): boolean {
    if (this.board.isOutOfBoard(toX, toY)) {
      return false;
    }

    const checker: CellBoardType = this.board.getChecker(fromX, fromY);

    if (!checker || checker.color !== this.currentPlayer) {
      return false;
    }

    const xDiff: number = Math.abs(fromX - toX);
    const yDiff: number = Math.abs(fromY - toY);

    if (
      checker.color === CheckerColor.WHITE && toX >= fromX
      || checker.color === CheckerColor.BLACK && toX <= fromX
    ) {
      return false;
    }

    if (
      xDiff === 1 && yDiff === 1
      && this.board.getChecker(toX, toY) === null
    ) {
      return true;
    }

    if (xDiff === 2 && yDiff === 2) {
      const middleX: number = (fromX + toX) / 2;
      const middleY: number = (fromY + toY) / 2;
      const middleChecker: CellBoardType = this.board.getChecker(middleX, middleY);

      if (
        middleChecker
        && middleChecker.color !== this.currentPlayer
        && this.board.getChecker(toX, toY) === null
      ) {
        return true;
      }
    }

    return false;
  }

  public makeMove(fromX: number, fromY: number, toX: number, toY: number): void {
    if (this.isValidMove(fromX, fromY, toX, toY)) {
      const xDiff = Math.abs(fromX - toX);
      this.board.moveChecker(fromX, fromY, toX, toY);

      if (xDiff === 2) {
        const middleX = (fromX + toX) / 2;
        const middleY = (fromY + toY) / 2;
        this.board.removeChecker(middleX, middleY);
      }

      if (!this.checkForWin()) {
        this.switchPlayer();
      }
    } else {
      throw new Error('wrong move');
    }
  }

  public switchPlayer(): void {
    if (this.currentPlayer === CheckerColor.WHITE) {
      this.currentPlayer = CheckerColor.BLACK;
      return;
    }

    this.currentPlayer = CheckerColor.WHITE;
  }

  public checkForWin(): boolean {
    let whiteCheckersOnBoard = false;
    let blackCheckersOnBoard = false;

    this.board.board.forEach(el => {
      el.forEach(checker => {
        if (checker instanceof Checker) {
          if (checker.color === CheckerColor.WHITE) {
            whiteCheckersOnBoard = true;
          }

          if (checker.color === CheckerColor.BLACK) {
            blackCheckersOnBoard = true;
          }
        }
      }); 
    });

    if (!whiteCheckersOnBoard || !blackCheckersOnBoard) {
      alert(`${this.currentPlayer} win!`);
      return true;
    }

    return false;
  }
}