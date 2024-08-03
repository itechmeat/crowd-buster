import React from 'react';
import cn from 'classnames';
import { CellAddress, Piece } from '../../types/game';
import styles from './GameField.module.scss';

interface CellProps {
  address: CellAddress;
  piece: Piece | null;
  isHighlighted: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ address, piece, isHighlighted, isActive, onClick }) => {
  return (
    <div 
      className={cn(styles.cell, { [styles.highlighted]: isHighlighted })}
      onClick={onClick}
    >
      {address}
      {piece && (
        <div className={cn(styles.chip, { 
          [styles.active]: isActive,
          [styles.finished]: piece.finished 
        })}>
          {piece.id}
        </div>
      )}
    </div>
  );
};