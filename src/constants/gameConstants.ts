import { Piece } from '../types/game';

export const INITIAL_PIECES: Piece[] = [
  { id: "X", position: "A3", finished: false, moved: false },
  { id: "Y", position: "A5", finished: false, moved: false },
  { id: "Z", position: "A7", finished: false, moved: false },
];

export const ROWS = "ABCDEFGHI";
export const COLS = "123456789";
export const TURN_DURATION = 10; // seconds