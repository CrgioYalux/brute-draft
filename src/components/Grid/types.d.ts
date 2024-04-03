type Cell = {
  cellId: number;
  rowId: number;
  isleId: number;
};

type Isle = Cell[];

interface GridContext {
  state: {
    selectedCell: Cell | null;
    selectedIsle: number;
  };
  action: {
    selectCell: (cell: Cell) => void;
    unselectCell: () => void;
    selectIsle: (isleId: number) => void;
    unselectIsle: () => void;
  };
}

interface RowContext extends GridContext {
  action: {
    selectCell: (cellId: number, isleId: number) => void;
    unselectCell: () => void;
    selectIsle: (isleId: number) => void;
    unselectIsle: () => void;
  };
}

interface RowProps {
  children?: React.ReactNode;
}

interface InternalRowProps extends RowProps {
  id: number;
  key: number;
}

interface CellProps {
  children?: React.ReactNode;
  isleId: number;
}

interface InternalCellProps extends CellProps {
  id: number;
  key: number;
  rowId: number;
}
