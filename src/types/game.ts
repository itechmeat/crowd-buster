export type CellAddress = `${string}${number}`;

export interface Piece {
  id: string;
  position: CellAddress;
  finished: boolean;
  moved: boolean;
}

export interface Player {
  id: string;
  pieces: Piece[];
}

export enum PieceState {
  Initial,
  Selected,
  Moved
}