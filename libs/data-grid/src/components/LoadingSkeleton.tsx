import { TableRow, TableCell, Skeleton } from '@mui/material';

type Props = {
  colCount: number;
};

const LoadingSkeleton = (props: Props) => {
  return (
    <>
      {[...Array(8).keys()].map((rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(props.colCount).keys()].map((colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton animation="wave" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default LoadingSkeleton;
