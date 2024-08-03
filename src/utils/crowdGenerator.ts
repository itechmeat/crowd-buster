import { Player, CellAddress } from '../types/game';
import { INITIAL_PIECES } from '../constants/gameConstants';
import { calculatePossibleMoves } from './gameLogic';

const ROWS = "ABCDEFGHI";

function mirrorPosition(position: CellAddress): CellAddress {
  const row = position[0];
  const col = parseInt(position[1]);
  const newRow = ROWS[ROWS.length - 1 - ROWS.indexOf(row)];
  const newCol = 10 - col;
  return `${newRow}${newCol}` as CellAddress;
}

export function generateCrowd(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `crowd_${index + 1}`,
    pieces: INITIAL_PIECES.map(piece => ({
      ...piece,
      position: mirrorPosition(piece.position),
      id: `${piece.id}_${index + 1}`
    }))
  }));
}

export function moveCrowdPieces(players: Player[]): Player[] {
  return players.map(player => ({
    ...player,
    pieces: player.pieces.map(piece => {
      if (piece.finished || piece.moved) return piece;
      const possibleMoves = calculatePossibleMoves(piece.position, player.pieces);
      if (possibleMoves.length === 0) return piece;
      const newPosition = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      return {
        ...piece,
        position: newPosition,
        moved: true,
        finished: newPosition.startsWith('A')
      };
    })
  }));
}