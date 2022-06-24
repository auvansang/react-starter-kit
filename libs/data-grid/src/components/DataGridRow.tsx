import { TableCell, TableRow } from '@mui/material';
import { Row } from '@tanstack/react-table';

import { COLUMN_SELECTION_ID } from '../constants';
import { ColDef } from 'types';

type Props<TDataItem> = {
  colDefs: Array<ColDef<TDataItem>>;
  rows: Array<Row<any>>;
};

const DataGridRow = <TDataItem,>(props: Props<TDataItem>) => {
  return (
    <>
      {props.rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => {
            const resizable = props.colDefs.some(
              (colDef) => colDef.name === cell.column.id && colDef.resizable
            );

            return (
              <TableCell
                key={cell.id}
                padding={cell.column.id === COLUMN_SELECTION_ID ? 'checkbox' : 'normal'}
                width={resizable ? cell.column.getSize() : undefined}
              >
                {cell.renderCell()}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};

export default DataGridRow;
