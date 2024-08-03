import React from 'react';
import cn from 'classnames';
import { PieceState } from '../../types/game';
import styles from './Chip.module.scss';

interface ChipProps {
  id: string;
  pieceState: PieceState;
  finished: boolean;
  isPlayer: boolean;
  style?: React.CSSProperties;
}

export const Chip: React.FC<ChipProps> = ({ id, pieceState, finished, isPlayer, style }) => {
  return (
    <div 
      className={cn(styles.chip, { 
        [styles.initial]: pieceState === PieceState.Initial && isPlayer,
        [styles.selected]: pieceState === PieceState.Selected && isPlayer,
        [styles.moved]: pieceState === PieceState.Moved && isPlayer,
        [styles.finished]: finished,
        [styles.crowd]: !isPlayer
      })}
      style={style}
    >
      {id}
    </div>
  );
};