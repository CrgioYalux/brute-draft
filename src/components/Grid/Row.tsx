import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  Children,
} from "react";

import {
  InternalCell,
} from "./Cell";

import {
  useGridContext,
} from "./Grid";

function Row({
  children,
}: RowProps): React.ReactNode {
  return (
    <div>
      {children}
    </div>
  );
}

const RowContext = createContext<RowContext>({} as RowContext);

function InternalRow({
  id,
  children,
}: InternalRowProps): React.ReactNode {
  const gridContext = useGridContext();

  const [didChildrenRender, setDidChildrenRender] = useState<boolean>(false);
  const [cells, setCells] = useState<InternalCellProps[]>([]);

  useEffect(() => {
    if (!didChildrenRender)
      setDidChildrenRender(true);
  }, [children]);

  useLayoutEffect(() => {
    if (didChildrenRender)
      Children.forEach(children, (child, index) => {
        const cell = child as React.ReactElement<CellProps>;

        setCells(
          (prev) => prev.findIndex(v => v.id === index) === -1 
            ? [
                ...prev,
                { ...cell.props, id: index, key: index, rowId: id, }
              ]
            : prev
        );
      });
  }, [didChildrenRender]);

  const selectCell = (cellId: number, isleId: number): void => {
    if (cells.findIndex(v => v.id === cellId) === -1) return;
    gridContext.action.selectCell({ cellId, isleId, rowId: id });
  };

  const selectIsle = (isleId: number): void => {
    if (cells.findIndex(v => v.isleId === isleId) === -1) return;
    gridContext.action.selectIsle(isleId);
  };

  const unselectCell = (): void => {
    gridContext.action.unselectCell();
  }

  const unselectIsle = (): void => {
    gridContext.action.unselectIsle();
  }

  const value: RowContext = {
    state: gridContext.state,
    action: { selectCell, unselectCell, selectIsle, unselectIsle, },
  };

  return (
    <RowContext.Provider value={value}>
      <div className='flex w-full border-collapse'>
        {cells.map(v => <InternalCell {...v} />)}
      </div>
    </RowContext.Provider>
  );
}

const useRowContext = (): RowContext => useContext(RowContext);

export { 
  InternalRow,
  Row,
  useRowContext,
};
