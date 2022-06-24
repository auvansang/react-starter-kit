import { MouseEvent, useMemo } from 'react';

import {
  createTable,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useTableInstance,
} from '@tanstack/react-table';

import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableProps,
  TableRow,
} from '@mui/material';
import NoRowsOverlay from 'components/NoRowsOverlay';
import LoadingSkeleton from 'components/LoadingSkeleton';

import { ColDef } from './types';
import { COLUMN_SELECTION_ID } from './constants';
import DataGridRow from 'components/DataGridRow';

type PaginationProps = {
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  pageSizeOptions?: Array<number>;
};

type DataGridProps<TDataItem> = {
  selection?: boolean;
  data: Array<TDataItem>;
  colDefs: Array<ColDef<TDataItem>>;
  size?: TableProps['size'];
  pagination?: PaginationProps;
  onPaginationChange?: OnChangeFn<PaginationState>;
  loading?: boolean;
};

const DataGrid = <TDataItem,>(props: DataGridProps<TDataItem>) => {
  const {
    size = 'medium',
    selection = false,
    pagination = {
      pageSize: 10,
      pageIndex: 1,
      totalItems: 100,
      pageSizeOptions: [10, 25, 50, 100],
    },
    loading = false,
  } = props;

  // eslint-disable-next-line @typescript-eslint/ban-types
  const tableBuilder = useMemo(() => createTable().setRowType<{}>(), []);

  const columns = useMemo(() => {
    return [
      selection &&
        tableBuilder.createDisplayColumn({
          id: COLUMN_SELECTION_ID,
          header: (headerProps) => (
            <Checkbox
              checked={headerProps.instance.getIsAllRowsSelected()}
              indeterminate={headerProps.instance.getIsSomeRowsSelected()}
              onChange={headerProps.instance.getToggleAllRowsSelectedHandler()}
            />
          ),
          cell: (cellProps) => (
            <Checkbox
              checked={cellProps.row.getIsSelected()}
              indeterminate={cellProps.row.getIsSomeSelected()}
              onChange={cellProps.row.getToggleSelectedHandler()}
            />
          ),
        }),
      ...props.colDefs.map((colDef) =>
        // @ts-ignore
        tableBuilder.createDataColumn(colDef.name, {
          header: colDef.header,
          cell: (cellProps) => cellProps.getValue(),
        })
      ),
    ].filter(Boolean);
  }, [tableBuilder]);

  const totalPages = Math.ceil(pagination.totalItems / pagination.pageSize) ?? -1;

  const tableInstance = useTableInstance(tableBuilder, {
    data: props.data,
    // @ts-ignore
    columns,
    columnResizeMode: 'onChange',
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: props.onPaginationChange,
  });

  const colCount = tableInstance.getAllColumns().length;

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    event?.preventDefault();

    tableInstance.setPageIndex(page);
  };

  return (
    <TableContainer>
      <Table size={size} width={tableInstance.getCenterTotalSize()}>
        <TableHead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const resizable = props.colDefs.some(
                  (colDef) => colDef.name === header.column.id && colDef.resizable
                );

                return (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    padding={header.column.id === COLUMN_SELECTION_ID ? 'checkbox' : 'normal'}
                    sx={
                      resizable
                        ? {
                            width: header.getSize(),
                            position: 'relative',
                          }
                        : undefined
                    }
                  >
                    {!header.isPlaceholder && header.renderHeader()}
                    {resizable && (
                      <Box
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        sx={{
                          position: 'absolute',
                          top: (theme) => theme.spacing(2),
                          right: (theme) => theme.spacing(0.25),
                          height: (theme) => theme.spacing(3),
                          width: 2,
                          backgroundColor: (theme) => theme.palette.action.disabledBackground,
                          cursor: 'col-resize',
                          userSelect: 'none',
                          touchAction: 'none',
                          ...(header.column.getIsResizing() && {
                            backgroundColor: (theme) => theme.palette.action.active,
                          }),
                        }}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {loading && <LoadingSkeleton colCount={colCount} />}

          {!loading && props.data.length === 0 && <NoRowsOverlay colSpan={colCount} />}

          {!loading && props.data.length > 0 && (
            <DataGridRow colDefs={props.colDefs} rows={tableInstance.getRowModel().rows} />
          )}
        </TableBody>
      </Table>
      {!loading && props.data.length > 0 && (
        <TablePagination
          component="div"
          showFirstButton={tableInstance.getCanPreviousPage()}
          showLastButton={tableInstance.getCanNextPage()}
          count={tableInstance.getPageCount()}
          rowsPerPageOptions={pagination.pageSizeOptions}
          page={tableInstance.getState().pagination.pageIndex}
          rowsPerPage={tableInstance.getState().pagination.pageSize}
          onPageChange={handleChangePage}
        />
      )}
    </TableContainer>
  );
};

export default DataGrid;
