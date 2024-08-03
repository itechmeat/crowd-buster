import { Piece } from '../types/game';

export const INITIAL_PIECES: Piece[] = [
  { id: "X", position: "A3", finished: false },
  { id: "Y", position: "A5", finished: false },
  { id: "Z", position: "A7", finished: false },
];

export const ROWS = "ABCDEFGHI";
export const COLS = "123456789";