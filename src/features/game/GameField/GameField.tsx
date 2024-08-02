import styles from './GameField.module.scss';

type CellAddress = `${string}${number}`;

const generateCellAddresses = (): CellAddress[] => {
  const addresses: CellAddress[] = [];
  const rows = "ABCDEFGHI".split('').reverse(); // Перевернем порядок строк, чтобы A была внизу
  const cols = "123456789";

  for (const row of rows) {
    for (const col of cols) {
      addresses.push(`${row}${col}` as CellAddress);
    }
  }

  return addresses;
};

const Cell: React.FC<{ address: CellAddress }> = ({ address }) => {
  return (
    <div className={styles.cell}>
      {address}
    </div>
  );
};

export const GameField = () => {
  const cellAddresses = generateCellAddresses();

  return (
    <div className={styles.gameBoard}>
      {cellAddresses.map((address) => (
        <Cell key={address} address={address} />
      ))}
    </div>
  );
}
