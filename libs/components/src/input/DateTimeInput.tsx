import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

import TextInput, { type TextInputProps } from './TextInput';

export type DateTimeInputProps = Omit<
  DateTimePickerProps<unknown, unknown>,
  'renderInput' | 'value'
> &
  Omit<TextInputProps, 'value'> & {
    value?: unknown;
  };

const DateTimeInput = (props: DateTimeInputProps) => {
  const { value = null, ...restProps } = props;

  return (
    <DateTimePicker
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

export default DateTimeInput;
