import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

import TextInput, { type TextInputProps } from './TextInput';

export type DateInputProps = Omit<DatePickerProps<unknown, unknown>, 'renderInput' | 'value'> &
  Omit<TextInputProps, 'value'> & {
    value?: unknown;
  };

const DateInput = (props: DateInputProps) => {
  const { value = null, ...restProps } = props;

  return (
    <DatePicker
      value={value}
      {...restProps}
      renderInput={({ InputProps, inputRef, inputProps }) => {
        return (
          <TextInput
            {...restProps}
            inputRef={inputRef}
            inputProps={{
              ...inputProps,
              placeholder: restProps?.placeholder || inputProps?.placeholder,
            }}
            startAdornment={InputProps?.startAdornment}
            endAdornment={InputProps?.endAdornment}
          />
        );
      }}
    />
  );
};

export default DateInput;
