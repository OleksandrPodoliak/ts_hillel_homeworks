import { Game, IGame, Board, IBoard, Checker } from "../index";

describe('Game', () => {
  let game: IGame;

  beforeAll(() => {
    game = new Game();
  });

  test('should create an instance of Game', () => {
    expect(game).toBeInstanceOf(Game);
  });

  test('should be a valid move while white', () => {
    expect(game.isValidMove(5, 0, 4, 1)).toBe(true);
  });

  test('should be a invalid move while white', () => {
    expect(game.isValidMove(5, 0, 6, 1)).toBe(false);
  });

  test('first player must be white', () => {
    expect(game.currentPlayer).toBe('white');
  });

  test('after switchPlayer player must be black', () => {
    game.switchPlayer();
    expect(game.currentPlayer).toBe('black');
  });

  test('should be a valid move while black', () => {
    expect(game.isValidMove(2, 1, 3, 2)).toBe(true);
  });

  test('should be a invalid move while black', () => {
    expect(game.isValidMove(2, 0, 3, 2)).toBe(false);
  });

  test('game can\'t be ended after start', () => {
    expect(game.checkForWin()).toBe(false);
  });

  test('should be a invalid move and return new error', () => {
    expect(() => game.makeMove(5, 0, 6, 1)).toThrow();
  });
});

describe('Board', () => {
  let board: IBoard;

  beforeAll(() => {
    board = new Board();
  });

  test('board length is 8', () => {
    expect(board.board).toHaveLength(8);
  });

  test('should create an instance of Board', () => {
    expect(board).toBeInstanceOf(Board);
  });

  test('should be an instance of Checker', () => {
    expect(board.getChecker(5, 0)).toBeInstanceOf(Checker);
  });

  test('should be an null', () => {
    expect(board.getChecker(5, 1)).toBeNull();
  });

  test('should be an null after remove checker', () => {
    board.removeChecker(5, 0);
    expect(board.getChecker(5, 0)).toBeNull();
  });

  test('x/y is out of board', () => {
    expect(board.isOutOfBoard(8, 0)).toBe(true);
    expect(board.isOutOfBoard(0, 8)).toBe(true);
  });
});