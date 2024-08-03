import React, { useState, useEffect } from 'react';
import { Cell } from './Cell';
import { CellAddress, Piece } from '../../types/game';
import { generateCellAddresses, calculatePossibleMoves } from '../../utils/gameLogic';
import { INITIAL_PIECES } from '../../constants/gameConstants';
import styles from './GameField.module.scss';

export const GameField: React.FC = () => {
  const cellAddresses = generateCellAddresses();
  const [pieces, setPieces] = useState<Piece[]>(INITIAL_PIECES);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<CellAddress[]>([]);

  useEffect(() => {
    const allFinished = pieces.every(piece => piece.finished);
    if (allFinished) {
      console.log("Поздравляем! Все фишки достигли конца.");
    }
  }, [pieces]);

  const handleCellClick = (address: CellAddress) => {
    const clickedPiece = pieces.find(piece => piece.position === address);

    if (clickedPiece && !clickedPiece.finished) {
      setSelectedPieceId(clickedPiece.id);
      setPossibleMoves(calculatePossibleMoves(clickedPiece.position, pieces));
    } else if (selectedPieceId) {
      if (possibleMoves.includes(address)) {
        setPieces(prevPieces =>
          prevPieces.map(piece => {
            if (piece.id === selectedPieceId) {
              const isFinished = address.startsWith('I');
              return { ...piece, position: address, finished: isFinished };
            }
            return piece;
          })
        );
        setSelectedPieceId(null);
        setPossibleMoves([]);
      }
    }
  };

  return (
    <div className={styles.gameBoard}>
      {cellAddresses.map((address) => (
        <Cell 
          key={address} 
          address={address}
          piece={pieces.find(piece => piece.position === address) || null}
          isHighlighted={possibleMoves.includes(address)}
          isActive={selectedPieceId === (pieces.find(piece => piece.position === address)?.id)}
          onClick={() => handleCellClick(address)}
        />
      ))}
    </div>
  );
};