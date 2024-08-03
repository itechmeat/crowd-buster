import { useState, useEffect } from 'react';
import styles from './GameField.module.scss';
import cn from 'classnames';

type CellAddress = `${string}${number}`;

interface Piece {
  id: string;
  position: CellAddress;
  finished: boolean;
}

const initialPieces: Piece[] = [
  { id: "X", position: "A3", finished: false },
  { id: "Y", position: "A5", finished: false },
  { id: "Z", position: "A7", finished: false },
];

const generateCellAddresses = (): CellAddress[] => {
  const addresses: CellAddress[] = [];
  const rows = "ABCDEFGHI".split('').reverse();
  const cols = "123456789";

  for (const row of rows) {
    for (const col of cols) {
      addresses.push(`${row}${col}` as CellAddress);
    }
  }

  return addresses;
};

const calculatePossibleMoves = (position: CellAddress, pieces: Piece[]): CellAddress[] => {
  const row = position[0];
  const col = parseInt(position[1]);
  const rows = "ABCDEFGHI";

  const rowIndex = rows.indexOf(row);

  const potentialMoves = [
    [rowIndex + 2, col + 1],
    [rowIndex + 2, col - 1],
    [rowIndex + 1, col + 2],
    [rowIndex + 1, col - 2],
    [rowIndex - 1, col + 2],
    [rowIndex - 1, col - 2],
    [rowIndex - 2, col + 1],
    [rowIndex - 2, col - 1],
  ];

  return potentialMoves
    .filter(([r, c]) => r >= 0 && r < 9 && c >= 1 && c <= 9) // валидные позиции
    .map(([r, c]) => `${rows[r]}${c}` as CellAddress)
    .filter((move) => 
      !pieces.some(piece => piece.position === move) // убираем занятые клетки
    )
    .filter((move) => {
      const moveRowIndex = rows.indexOf(move[0]);
      return moveRowIndex > rowIndex; // только вперед
    });
};

const Cell: React.FC<{ 
  address: CellAddress;
  piece: Piece | null;
  isHighlighted: boolean;
  isActive: boolean;
  onClick: () => void;
}> = ({ address, piece, isHighlighted, isActive, onClick }) => {
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

export const GameField = () => {
  const cellAddresses = generateCellAddresses();
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<CellAddress[]>([]);

  // Проверка на победу
  useEffect(() => {
    const allFinished = pieces.every(piece => piece.finished);
    if (allFinished) {
      console.log("Поздравляем! Все фишки достигли конца.");
    }
  }, [pieces]);

  const handleCellClick = (address: CellAddress) => {
    const clickedPiece = pieces.find(piece => piece.position === address);

    if (clickedPiece && !clickedPiece.finished) {
      // Если кликаем на другую фишку, она становится активной
      setSelectedPieceId(clickedPiece.id);
      setPossibleMoves(calculatePossibleMoves(clickedPiece.position, pieces));
    } else if (selectedPieceId) {
      if (possibleMoves.includes(address)) {
        setPieces(prevPieces =>
          prevPieces.map(piece => {
            if (piece.id === selectedPieceId) {
              // Проверяем, достигла ли фишка ряда I
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
}
