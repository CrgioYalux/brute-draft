import { 
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  Children,
} from 'react';

interface CellProps {
  children?: React.ReactNode;
  isleId: number;
};

function Cell({
  children,
}: CellProps): React.ReactNode {

  return (
    <div>{children}</div>
  ); 
}

interface RowProps {
  children?: React.ReactNode;
};

function Row({
  children,
}: RowProps): React.ReactNode {

  return (
    <RowContext.Provider value={{}}>
      <div className='flex flex-row gap-2'>
        {children}
      </div>
    </RowContext.Provider>
  );
}

interface RowContext {};
const RowContext = createContext<RowContext>({} as RowContext);
const useRowContextProvider = (): RowContext => useContext(RowContext);

interface GridContext {};
const GridContext = createContext<GridContext>({} as GridContext);
const useGridContextProvider = (): GridContext => useContext(GridContext);

interface InternalCellProps extends CellProps {
  id: number;
  key: number;
};

function InternalCell({
  id,
  children,
}: InternalCellProps): React.ReactNode {
  const rowContext = useRowContextProvider();

  return (
    <div className='flex-1 bg-blue-500 text-center'>
      {children}
    </div>
  );
}

interface InternalRowProps extends RowProps {
  id: number;
  key: number;
};

function InternalRow({
  id,
  children,
}: InternalRowProps): React.ReactNode {
  const gridContext = useGridContextProvider();

  const [didChildrenRender, setDidChildrenRender] = useState<boolean>(false);
  const [cells, setCells] = useState<InternalCellProps[]>([]);

  useEffect(() => {
    if (!didChildrenRender)
      setDidChildrenRender(true);
  }, [children]);

  useLayoutEffect(() => {
    if (didChildrenRender) {
      Children.forEach(children, (child, index) => {
        const cell = child as React.ReactElement<CellProps>;

        setCells(
          (prev) => prev.findIndex(v => v.id === index) === -1 
            ? [
                ...prev,
                { ...cell.props, id: index, key: index, }
              ]
            : prev
        );
      });
    }
  }, [didChildrenRender]);

  return (
    <RowContext.Provider value={{}}>
      <div className='flex w-full gap-2'>
        {cells.map(v => <InternalCell {...v} />)}
      </div>
    </RowContext.Provider>
  );
}

interface GridProps {
  children: React.ReactNode;
};

function Grid({
  children,
}: GridProps): React.ReactNode {
  const [didChildrenRender, setDidChildrenRender] = useState<boolean>(false);
  const [rows, setRows] = useState<InternalRowProps[]>([]);

  useEffect(() => {
    if (!didChildrenRender)
      setDidChildrenRender(true);
  }, [children]);

  useLayoutEffect(() => {
    if (didChildrenRender) {
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
    }
  }, [didChildrenRender]);

  return (
    <GridContext.Provider value={{}}>
      <div className='flex flex-col w-max gap-2'>
        {rows.map(v => <InternalRow {...v} />)}
      </div>
    </GridContext.Provider>
  );
}

export { Grid, Row, Cell };
