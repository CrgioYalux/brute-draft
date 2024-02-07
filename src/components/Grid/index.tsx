import { createContext, useContext, useState, useEffect, useRef } from 'react';

interface GridProps {
  children: React.ReactNode;
};

interface RowProps {
  children?: React.ReactNode;
  id: number;
};

interface CellProps {
  children?: React.ReactNode;
  isleId: number;
  id: number;
};

type CellT = {
  position: {
    x: number;
    y: number;
  };
  isleId: number;
  cellId: number;
};
type RowT = {
  rowId: number;
  cells: CellT[];
};
type GridT = RowT[];

interface GridContext {
  addRow: (rowId: number) => void;
  isRowAdded: (rowId: number) => boolean;
  updateRow: (rowId: number, cells: CellT[]) => void;
};
const GridContext = createContext<GridContext>({} as GridContext);
const useGridContextProvider = (): GridContext => useContext(GridContext);

interface RowContext {
  addCell: (cellId: number, isleId: number) => void;
  isCellAdded: (cellId: number) => boolean;
};
const RowContext = createContext<RowContext>({} as RowContext);
const useRowContextProvider = (): RowContext => useContext(RowContext);

function Cell({
  children,
  isleId, // join cells together
  id, // identifies a cell
}: CellProps): React.ReactNode {
  const rowContext = useRowContextProvider();

  useEffect(() => {
    rowContext.addCell(id, isleId);
    // subscribe to row
  }, []);

  return (
    <div>{children}</div>
  );
}

function Row({
  children,
  id,
}: RowProps): React.ReactNode {
  const gridContext = useGridContextProvider();
  const cells = useRef<Map<number, CellT>>(new Map());
  // const [cells, setCells] = useState<CellT[]>([]);

  useEffect(() => {
    if (!gridContext.isRowAdded(id)) {
      gridContext.addRow(id);
    }
    // subscribe to grid
  }, []);

  const addCell = (cellId: number, isleId: number): void => {
    // const change = [...cells, { cellId, isleId, position: { x: 0, y: cellId } }]; // x could be provided for the the grid
    // setCells(() => change);
    cells.current.set(cellId, { cellId, isleId, position: { x: 0, y: cellId } });
    gridContext.updateRow(id, Array.from(cells.current.values()));
  };

  const isCellAdded = (cellId: number): boolean => {
    return cells.current.has(cellId);
  };

  return (
    <RowContext.Provider value={{ addCell, isCellAdded, }}>
      {children}
    </RowContext.Provider>
  );
}

function Grid({
  children,
}: GridProps): React.ReactNode {

  const grid = useRef<Map<number, CellT[]>>(new Map());
  // const [grid, setGrid] = useState<GridT>([]);

  const addRow = (rowId: number): void => {
    // setGrid((prev) => ([ ...prev, { rowId, cells: [] } ]));
    grid.current.set(rowId, []);
    console.log({ added: true, grid });
  };

  const isRowAdded = (rowId: number): boolean => {
    return grid.current.has(rowId);
  };

  const updateRow = (rowId: number, cells: CellT[]): void => {
    // setGrid((prev) => prev.map((r) => r.rowId === rowId ? ({ ...r, cells }) : r ));
    grid.current.set(rowId, cells);
    console.log({ updated: true, grid });
  };

  return (
    <GridContext.Provider value={{ addRow, isRowAdded, updateRow, }}>
      {children}
    </GridContext.Provider>
  );
}

export { Grid, Row, Cell };

/*
Postnotes
- It's working
- Seems like it renders a lot but it just because everything runs twice since react dev mode
- The subscribing useEffect in the Row is not necessary since the addCell already call it before actually
- Now that I have the structure created within the grid's map I can start adding useful properties
*/
