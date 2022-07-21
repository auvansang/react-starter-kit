import { ReactNode, useId } from 'react';

import { MenuItem, Select } from '@mui/material';
import TextInput, { TextInputProps } from './TextInput';

export type SelectInputProps = TextInputProps & {
  options: Array<{
    label: ReactNode;
    value: string | number;
  }>;
};

const SelectInput = (props: SelectInputProps) => {
  const autoId = useId();
  const { options, labelId = autoId, ...restInputProps } = props;

  return (
    <Select labelId={labelId} input={<TextInput labelId={labelId} {...restInputProps} />}>
      {options.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
