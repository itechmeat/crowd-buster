import React from 'react';
import cn from 'classnames';
import { CellAddress, Piece, PieceState } from '../../types/game';
import styles from './GameField.module.scss';

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
        <div className={cn(styles.chip, { 
          [styles.initial]: pieceState === PieceState.Initial,
          [styles.selected]: pieceState === PieceState.Selected,
          [styles.moved]: pieceState === PieceState.Moved,
          [styles.finished]: piece.finished 
        })}>
          {piece.id}
        </div>
      )}
    </div>
  );
};