import React from 'react';
import cn from 'classnames';
import { CellAddress, Piece, PieceState } from '../../types/game';
import { Chip } from '../Chip/Chip';
import styles from './Cell.module.scss';

interface CellProps {
  address: CellAddress;
  piece: Piece | null;
  isHighlighted: boolean;
  pieceState: PieceState;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ address, piece, isHighlighted, pieceState, onClick }) => {
  return (
    <div 
      className={cn(styles.cell, { [styles.highlighted]: isHighlighted })}
      onClick={onClick}
    >
      {address}
      {piece && (
        <Chip
          id={piece.id}
          pieceState={pieceState}
          finished={piece.finished}
        />
      )}
    </div>
  );
};