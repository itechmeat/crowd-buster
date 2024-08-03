import React, { useState, useEffect, useCallback } from 'react';
import { Cell } from './Cell';
import { Timer } from './Timer';
import { CellAddress, Piece, PieceState } from '../../types/game';
import { generateCellAddresses, calculatePossibleMoves } from '../../utils/gameLogic';
import { INITIAL_PIECES, TURN_DURATION } from '../../constants/gameConstants';
import styles from './GameField.module.scss';

export const GameField: React.FC = () => {
  const cellAddresses = generateCellAddresses();
  const [pieces, setPieces] = useState<Piece[]>(INITIAL_PIECES);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<CellAddress[]>([]);
  const [timeLeft, setTimeLeft] = useState(TURN_DURATION);
  const [turnEnded, setTurnEnded] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const moveUnmovedPieces = useCallback(() => {
    setPieces((prevPieces) => {
      const updatedPieces = [...prevPieces];
      
      // Сначала обрабатываем все непередвинутые фишки
      const unmovedPieces = updatedPieces.filter(piece => !piece.moved && !piece.finished);
      
      for (const piece of unmovedPieces) {
        const possibleMoves = calculatePossibleMoves(piece.position, updatedPieces);
        const availableMoves = possibleMoves.filter(move => 
          !updatedPieces.some(p => p.position === move)
        );
        
        if (availableMoves.length > 0) {
          const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          const pieceIndex = updatedPieces.findIndex(p => p.id === piece.id);
          updatedPieces[pieceIndex] = {
            ...piece,
            position: randomMove,
            moved: true,
            finished: randomMove.startsWith('I')
          };
        }
      }
      
      return updatedPieces;
    });
  }, []);

  useEffect(() => {
    if (gameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setTurnEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameFinished]);

  useEffect(() => {
    if (turnEnded && !gameFinished) {
      moveUnmovedPieces();
      setTimeout(() => {
        setTimeLeft(TURN_DURATION);
        setPieces((prevPieces) => {
          const updatedPieces = prevPieces.map((piece) => ({ ...piece, moved: false }));
          const allFinished = updatedPieces.every(piece => piece.finished);
          if (allFinished) {
            setGameFinished(true);
          }
          return updatedPieces;
        });
        setSelectedPieceId(null);
        setPossibleMoves([]);
        setTurnEnded(false);
      }, 1000);
    }
  }, [turnEnded, moveUnmovedPieces, gameFinished]);

  useEffect(() => {
    const allFinished = pieces.every(piece => piece.finished);
    if (allFinished) {
      setGameFinished(true);
      console.log("Поздравляем! Все фишки достигли конца.");
    }
  }, [pieces]);

  useEffect(() => {
    if (timeLeft === TURN_DURATION) {
      // Reset pieces for new turn
      setPieces((prevPieces) =>
        prevPieces.map((piece) => ({ ...piece, moved: false }))
      );
      setSelectedPieceId(null);
      setPossibleMoves([]);
    }

    if (timeLeft === 0) {
      // Automatic move for unmoved pieces
      setPieces((prevPieces) =>
        prevPieces.map((piece) => {
          if (!piece.moved && !piece.finished) {
            const possibleMoves = calculatePossibleMoves(piece.position, prevPieces);
            if (possibleMoves.length > 0) {
              const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
              return {
                ...piece,
                position: randomMove,
                moved: true,
                finished: randomMove.startsWith('I')
              };
            }
          }
          return piece;
        })
      );
    }
  }, [timeLeft]);

  const handleCellClick = (address: CellAddress) => {
    const clickedPiece = pieces.find(piece => piece.position === address);

    if (clickedPiece && !clickedPiece.finished && !clickedPiece.moved) {
      setSelectedPieceId(clickedPiece.id);
      setPossibleMoves(calculatePossibleMoves(clickedPiece.position, pieces));
    } else if (selectedPieceId) {
      if (possibleMoves.includes(address)) {
        setPieces(prevPieces =>
          prevPieces.map(piece => {
            if (piece.id === selectedPieceId) {
              const isFinished = address.startsWith('I');
              return { ...piece, position: address, finished: isFinished, moved: true };
            }
            return piece;
          })
        );
        setSelectedPieceId(null);
        setPossibleMoves([]);
      }
    }
  };

  const getPieceState = (piece: Piece | null): PieceState => {
    if (!piece) return PieceState.Initial;
    if (piece.finished) return PieceState.Moved;
    if (piece.id === selectedPieceId) return PieceState.Selected;
    if (piece.moved) return PieceState.Moved;
    return PieceState.Initial;
  };

  return (
    <div>
      <Timer timeLeft={timeLeft} />
      <div className={styles.gameBoard}>
        {cellAddresses.map((address) => (
          <Cell 
            key={address} 
            address={address}
            piece={pieces.find(piece => piece.position === address) || null}
            isHighlighted={possibleMoves.includes(address)}
            pieceState={getPieceState(pieces.find(piece => piece.position === address) || null)}
            onClick={() => handleCellClick(address)}
          />
        ))}
      </div>
    </div>
  );
};