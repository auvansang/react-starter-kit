import { Stack, StackProps } from '@mui/material';

type VStackProps = Omit<StackProps, 'direction'>;

const VStack = (props: VStackProps) => {
  return <Stack direction="column" {...props} />;
};

export default VStack;
