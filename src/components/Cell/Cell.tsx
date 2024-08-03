import React from 'react';
import cn from 'classnames';
import { CellAddress, Piece, PieceState } from '../../types/game';
import { Chip } from '../Chip/Chip';
import styles from './Cell.module.scss';

interface CellProps {
  address: CellAddress;
  playerPiece: Piece | null;
  crowdPieces: Piece[];
  isHighlighted: boolean;
  pieceState: PieceState;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ 
  address, 
  playerPiece, 
  crowdPieces, 
  isHighlighted, 
  pieceState, 
  onClick 
}) => {
  return (
    <div 
      className={cn(styles.cell, { [styles.highlighted]: isHighlighted })}
      onClick={onClick}
    >
      {address}
      {playerPiece && (
        <Chip
          id={playerPiece.id}
          pieceState={pieceState}
          finished={playerPiece.finished}
          isPlayer={true}
        />
      )}
      {crowdPieces.map((piece) => (
        <Chip
          key={piece.id}
          id={piece.id}
          pieceState={PieceState.Moved}
          finished={piece.finished}
          isPlayer={false}
        />
      ))}
    </div>
  );
};