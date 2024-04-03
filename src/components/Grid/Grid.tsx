import { 
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  Children,
} from "react";

import {
  InternalRow
} from "./Row";

const GridContext = createContext<GridContext>({} as GridContext);

interface GridProps {
  children: React.ReactNode;
};

function Grid({
  children,
}: GridProps): React.ReactNode {
  const [didChildrenRender, setDidChildrenRender] = useState<boolean>(false);
  const [rows, setRows] = useState<InternalRowProps[]>([]);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [selectedIsle, setSelectedIsle] = useState<number>(-1);

  useEffect(() => {
    if (!didChildrenRender)
      setDidChildrenRender(true);
  }, [children]);

  useLayoutEffect(() => {
    if (didChildrenRender)
      Children.forEach(children, (child, index) => {
        const row = child as React.ReactElement<RowProps>;

        setRows(
          (prev) => prev.findIndex(v => v.id === index) === -1 
            ? [
                ...prev,
                { ...row.props, id: index, key: index, }
              ]
            : prev
        );
      });
  }, [didChildrenRender]);

  const selectCell = (cell: Cell): void => {
    setSelectedCell(cell);
  };

  const selectIsle = (isleId: number): void => {
    setSelectedIsle(isleId);
  };

  const unselectCell = (): void => {
    setSelectedCell(null);
  };

  const unselectIsle = (): void => {
    setSelectedIsle(-1);
  };

  const value: GridContext = {
    state: { selectedCell, selectedIsle, },
    action: { selectCell, unselectCell, selectIsle, unselectIsle, },
  };

  return (
    <GridContext.Provider value={value}>
      <div className='flex flex-col'>
        {rows.map(v => <InternalRow {...v} />)}
      </div>
    </GridContext.Provider>
  );
}

const useGridContext = (): GridContext => useContext(GridContext);

export { 
  Grid,
  useGridContext,
};
