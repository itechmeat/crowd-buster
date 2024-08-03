import React from 'react';
import cn from 'classnames';
import { PieceState } from '../../types/game';
import styles from './Chip.module.scss';

interface ChipProps {
  id: string;
  pieceState: PieceState;
  finished: boolean;
}

export const Chip: React.FC<ChipProps> = ({ id, pieceState, finished }) => {
  return (
    <div className={cn(styles.chip, { 
      [styles.initial]: pieceState === PieceState.Initial,
      [styles.selected]: pieceState === PieceState.Selected,
      [styles.moved]: pieceState === PieceState.Moved,
      [styles.finished]: finished 
    })}>
      {id}
    </div>
  );
};