import { TableRow, TableCell, Box } from '@mui/material';

type Props = {
  colSpan: number;
  noRowsText?: string;
};

const NoRowsOverlay = (props: Props) => {
  const { colSpan, noRowsText = 'No Records' } = props;

  return (
    <>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: (theme) => theme.spacing(20),
            }}
          >
            {noRowsText}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default NoRowsOverlay;
