import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

import TextInput from './TextInput';

export type DateTimeInputProps = Omit<
  DateTimePickerProps<unknown, unknown>,
  'renderInput' | 'value'
> & {
  value?: unknown;
};

const DateTimeInput = (props: DateTimeInputProps) => {
  const { value = null, ...restProps } = props;

  return (
    <DateTimePicker
      value={value}
      {...restProps}
      renderInput={({ InputProps, inputRef, inputProps }) => (
        <TextInput
          inputRef={inputRef}
          inputProps={inputProps}
          startAdornment={InputProps?.startAdornment}
          endAdornment={InputProps?.endAdornment}
        />
      )}
    />
  );
};

export default DateTimeInput;
