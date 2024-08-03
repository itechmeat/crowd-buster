import React from 'react';
import styles from './GameField.module.scss';

interface TimerProps {
  timeLeft: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div className={styles.timer}>
      Time left: {timeLeft} seconds
    </div>
  );
};