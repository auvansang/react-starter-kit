import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

import TextInput from './TextInput';

export type DateInputProps = Omit<DatePickerProps<unknown, unknown>, 'renderInput' | 'value'> & {
  value?: unknown;
};

const DateInput = (props: DateInputProps) => {
  const { value = null, ...restProps } = props;

  return (
    <DatePicker
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

export default DateInput;
