import { Stack, StackProps } from '@mui/material';

type HStackProps = Omit<StackProps, 'direction'>;

const HStack = (props: HStackProps) => {
  return <Stack direction="row" {...props} />;
};

export default HStack;
