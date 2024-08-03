import { useState } from 'react';
import styles from './GameField.module.scss';
import cn from 'classnames';

type CellAddress = `${string}${number}`;

interface Piece {
  id: string;
  position: CellAddress;
}

const initialPieces: Piece[] = [
  { id: "X", position: "A3" },
  { id: "Y", position: "A5" },
  { id: "Z", position: "A7" },
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

const calculatePossibleMoves = (position: CellAddress): CellAddress[] => {
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
    .filter(([r, c]) => r >= 0 && r < 9 && c >= 1 && c <= 9)
    .map(([r, c]) => `${rows[r]}${c}` as CellAddress);
};

const Cell: React.FC<{ 
  address: CellAddress;
  piece: Piece | null;
  isHighlighted: boolean;
  onClick: () => void;
}> = ({ address, piece, isHighlighted, onClick }) => {
  return (
    <div 
      className={cn(styles.cell, { [styles.highlighted]: isHighlighted })}
      onClick={onClick}
    >
      {address}
      {piece && <div className={cn(styles.chip)}>{piece.id}</div>}
    </div>
  );
};

export const GameField = () => {
  const cellAddresses = generateCellAddresses();
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<CellAddress[]>([]);

  const handleCellClick = (address: CellAddress) => {
    const clickedPiece = pieces.find(piece => piece.position === address);

    if (selectedPieceId) {
      if (possibleMoves.includes(address)) {
        setPieces(prevPieces =>
          prevPieces.map(piece =>
            piece.id === selectedPieceId ? { ...piece, position: address } : piece
          )
        );
        setSelectedPieceId(null);
        setPossibleMoves([]);
      }
    } else if (clickedPiece) {
      setSelectedPieceId(clickedPiece.id);
      setPossibleMoves(calculatePossibleMoves(clickedPiece.position));
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
          onClick={() => handleCellClick(address)}
        />
      ))}
    </div>
  );
}
