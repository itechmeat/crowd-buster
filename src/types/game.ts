export type CellAddress = `${string}${number}`;

export interface Piece {
  id: string;
  position: CellAddress;
  finished: boolean;
}