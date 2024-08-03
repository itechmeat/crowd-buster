import { CellAddress, Piece } from '../types/game';
import { ROWS, COLS } from '../constants/gameConstants';

export const generateCellAddresses = (): CellAddress[] => {
  const addresses: CellAddress[] = [];
  const rows = ROWS.split('').reverse();

  for (const row of rows) {
    for (const col of COLS) {
      addresses.push(`${row}${col}` as CellAddress);
    }
  }

  return addresses;
};

export const calculatePossibleMoves = (position: CellAddress, pieces: Piece[]): CellAddress[] => {
  const row = position[0];
  const col = parseInt(position[1]);

  const rowIndex = ROWS.indexOf(row);

  const potentialMoves = [
    [rowIndex + 2, col + 1],
    [rowIndex + 2, col - 1],
    [rowIndex + 1, col + 2],
    [rowIndex + 1, col - 2],
    [rowIndex - 1, col + 2],
    [rowIndex - 1, col - 2],
    [rowIndex - 2, col + 1],
    [rowIndex - 2, col - 1],
  ];

  return potentialMoves
    .filter(([r, c]) => r >= 0 && r < 9 && c >= 1 && c <= 9)
    .map(([r, c]) => `${ROWS[r]}${c}` as CellAddress)
    .filter((move) => !pieces.some(piece => piece.position === move))
    .filter((move) => {
      const moveRowIndex = ROWS.indexOf(move[0]);
      return moveRowIndex > rowIndex;
    });
};