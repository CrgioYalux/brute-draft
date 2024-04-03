import {
  useRowContext,
} from "./Row";

function Cell({
  children,
}: CellProps): React.ReactNode {
  return (
    <div>{children}</div>
  ); 
}

function InternalCell({
  id,
  rowId,
  isleId,
  children,
}: InternalCellProps): React.ReactNode {
  const rowContext = useRowContext();
  
  const belongsToSelectedIsle = rowContext.state.selectedIsle === isleId;
  const isSelectedCell = rowContext.state.selectedCell?.cellId === id && rowContext.state.selectedCell?.rowId === rowId;

  return (
    <div
    className={`
      flex flex-col items-center flex-1 bg-blue-500 border-2 box-border border-collapse
      ${isSelectedCell ? 'border-black bg-red-500' : 'border-transparent'}
      ${belongsToSelectedIsle && !isSelectedCell ? 'bg-green-500' : ''}
    `}
    >
      <div className='flex w-full justify-between'>
        <button 
        className='border border-1 border-collapse' 
        onClick={() => {
          if (isSelectedCell)
            return rowContext.action.unselectCell();
          rowContext.action.selectCell(id, isleId);
        }}
        >
          cell
        </button>
        <button 
        className='border border-1'
        onClick={() => {
          if (belongsToSelectedIsle)
            return rowContext.action.unselectIsle();
          rowContext.action.selectIsle(isleId);
        }}
        >
          isle
        </button>
      </div>
      {children}
    </div>
  );
}

export { 
  Cell,
  InternalCell,
};
